from flask import Flask, request
import pandas as pd 
from apyori import apriori
from scipy.spatial.distance import cdist
import numpy as np
import json
from sklearn.cluster import AgglomerativeClustering 
from kneed import KneeLocator
from sklearn.cluster import KMeans

app = Flask(__name__,static_folder="frontend/build",static_url_path="/")


#apriori funcitons

def generadorLista(data):
    lista=[]
    rows=len(data)
    columns=len(data.columns)
    for i in range(0,rows):
        lista.append([str(data.values[i,j])for j in range(0,columns)])
    return lista

def aprioriAlgo(lista,minSupport,minConfidence,minLift,minLength):
    rule=apriori(lista,min_support=minSupport, min_confidence=minConfidence,min_lift=minLift,min_length=minLength)
    results=list(rule)
    return results

def generadorObjetoRes(results):
    resultsObject={"rules":[]}
    for idx,item in enumerate(results):
        emparejar=item[0]
        items=[x for x in emparejar]
        resultsObject["rules"].append({"items":list(item[0]),"support":item[1],"confidence":item[2][0][2],"lift":item[2][0][3],"number":idx})
        
    return resultsObject

#Metricas de similitud

def euclidianTableGenerator(dataTable):
    euclidian_data = cdist(dataTable,dataTable, metric ="euclidean")  
    #Hacemos la tabla
    final_euclidian_table=pd.DataFrame(euclidian_data)
    return final_euclidian_table

def minkokwskiTableGenerator(dataTable):
    minkowski_data=cdist(dataTable,dataTable, metric ="minkowski",p=1.5) 
    final_minkowski_table=pd.DataFrame(minkowski_data)
    return final_minkowski_table

def chebyshevTableGenerator(dataTable):
    chebyshev_data=cdist(dataTable,dataTable, metric ="chebyshev") 
    final_chebyshev_table=pd.DataFrame(chebyshev_data)
    return final_chebyshev_table

def manhattanTableGenerator(dataTable):
    manhattan_data=cdist(dataTable,dataTable, metric ="cityblock") 
    final_manhattan_table=pd.DataFrame(manhattan_data)
    return final_manhattan_table

def obtainNClusters(matrix):
    SSE = []
    for i in range(2, 12):
        km = KMeans(n_clusters=i, random_state=0)
        km.fit(matrix)
        SSE.append(km.inertia_)
    kl = KneeLocator(range(2, 12), SSE, curve="convex", direction="decreasing")
    nClusters=kl.elbow
    return nClusters

def fillNanWithMean(table):
    if(table.isnull().values.any()):
        for column in table:
            table[column].fillna((table[column].mean()), inplace=True)
        return table
    return table


@app.route("/")
@app.route('/priori')
@app.route('/metricas')
@app.route('/clustering-jerarquico')
@app.route('/clustering-particional')
def index():
    return app.send_static_file("index.html")


@app.route('/api/priori', methods=['POST'])
def priori():
    if request.method == 'POST':
        file = request.files['file']
        data=request.form.to_dict()
        if file:
            csvFile=pd.read_csv(file, header=None, error_bad_lines=False)
            # Hacemos una lista con la data
            lista=generadorLista(data=csvFile)
            #Obtenemos las reglas
            minSupport=float(data["support"])
            minConfidence=float(data["confidence"])
            minLift=float(data["lift"])
            minLength=float(data["minElements"])
            results=aprioriAlgo(lista,minSupport,minConfidence,minLift,minLength)
            #Le damos forma de objeto
            resultsObject=generadorObjetoRes(results)
            return resultsObject

@app.route('/api/metricas', methods=['POST'])
def metricas():
     if request.method == 'POST':
        file = request.files['file']
        extension=file.filename.split(".")[1]
        if file:
            csvFile= pd.read_table(file) if extension=="txt" else pd.read_csv(file)
            dataTable=csvFile.select_dtypes(include=['float64','int64'])
            numberRows=len(dataTable)
            numberColumns=len(dataTable.columns)
            if (numberRows>1 and numberColumns>1):
                #Los convertimos en objetos para enviarlos al frontend
                final_euclidian_array=euclidianTableGenerator(dataTable).to_dict('records')
                final_minkoswki_array=minkokwskiTableGenerator(dataTable).to_dict('records')
                final_chebyshev_array=chebyshevTableGenerator(dataTable).to_dict('records')
                final_manhattan_array=manhattanTableGenerator(dataTable).to_dict('records')
                distancesArray={"euclidian":final_euclidian_array,"minkowski":final_minkoswki_array,"chebyshev":final_chebyshev_array,"manhattan":final_manhattan_array, "numberColumns":len(final_minkoswki_array)}
                return distancesArray
            return "Record not found", 400
        return {}

@app.route("/api/clusteringVariables",methods=["POST"])
def clusteringVariables():
    if request.method == 'POST':
        file = request.files['file']
        extension=file.filename.split(".")[1]
        if file:
            csvFile= pd.read_table(file) if extension=="txt" else pd.read_csv(file)
            dataTable=csvFile.select_dtypes(include=['float64','int64'])
            dataTableWithoutNan=fillNanWithMean(dataTable)
            numberRows=len(dataTableWithoutNan)
            numberColumns=len(dataTableWithoutNan.columns)
            if (numberRows>1 and numberColumns>1):
                #Obtenemos la correlacion de Pearson para seleccionar las variabless
                corrDataFrame=dataTableWithoutNan.corr(method="pearson")
                firstColumnIndex=corrDataFrame.columns[0]
                # Ordenamos las variables para escoger las mas adecuadas
                sortedColumn=corrDataFrame[firstColumnIndex].sort_values(ascending=False)[:10]
                corrSortedVariables=sortedColumn.to_dict()
                return {"variables":[corrSortedVariables]}
            return "Record not found", 400
        return {}

@app.route("/api/clusteringJerarquico",methods=["POST"])
def clusteringJerarquicoResultados():
   if request.method == 'POST':
        file = request.files["file"]
        extension=file.filename.split(".")[1]
        #Convertimos nuestro JSON a tipos de datos de python
        value=json.loads(request.form["variablesSelected"])
        #Checamos si el usuario escogio las variables o prefirio usar todas
        variables=value
        if file:
            csvFile= pd.read_table(file).fillna(0) if extension=="txt" else pd.read_csv(file).fillna(0)
            dataTable=csvFile.select_dtypes(include=['float64','int64'])
            dataTableWithoutNan=fillNanWithMean(dataTable)
            numberColumns=len(dataTableWithoutNan.columns)
            #Procedemos a seleccionar lo que necesitamos de la tabla.
            actualMatrix=dataTableWithoutNan.iloc[:, 0:numberColumns].values if variables=="all" else np.array(dataTable[variables]) 
            #Procedemos al algoritmo de clustering jerarquico
            MJerarquico = AgglomerativeClustering(n_clusters=5, linkage='complete', affinity='euclidean')
            MJerarquico.fit_predict(actualMatrix)
            csvFile["clusterH"]=MJerarquico.labels_
            #Le damos forma a la data para enviarla al front end
            clustersQuantity=csvFile.groupby(['clusterH'])['clusterH'].count().to_dict()
            centroidesH = csvFile.groupby(['clusterH']).mean().to_dict("records") if value=="all" else csvFile.groupby(['clusterH'])[variables].mean().to_dict("records")
            csvFile=csvFile.to_dict("records")
            # Lo pasamos como string para que no ordene automaticamente las llaves
            return {"clustersQuantity":clustersQuantity,"centroidesH":json.dumps(centroidesH),"tablaGeneral":json.dumps(csvFile)}
        return {} 

@app.route("/api/clusteringParticional",methods=["POST"])
def clusteringParticionalResultados():
   if request.method == 'POST':
        file = request.files["file"]
        extension=file.filename.split(".")[1]
        #Convertimos nuestro JSON a tipos de datos de python
        value=json.loads(request.form["variablesSelected"])
        #Checamos si el usuario escogio las variables o prefirio usar todas
        variables=value
        if file:
            csvFile= pd.read_table(file).fillna(0) if extension=="txt" else pd.read_csv(file).fillna(0)
            dataTable=csvFile.select_dtypes(include=['float64','int64'])
            dataTableWithoutNan=fillNanWithMean(dataTable)
            numberColumns=len(dataTableWithoutNan.columns)
            #Procedemos a seleccionar lo que necesitamos de la tabla.
            actualMatrix=dataTableWithoutNan.iloc[:, 0:numberColumns].values if variables=="all" else np.array(dataTableWithoutNan[variables]) 
            #Procedemos al algoritmo de clustering jerarquico
            MParticional =KMeans(n_clusters=obtainNClusters(actualMatrix), random_state=0).fit(actualMatrix) 
            MParticional.predict(actualMatrix)
            csvFile["clusterP"]=MParticional.labels_
            #Le damos forma a la data para enviarla al front end
            clustersQuantity=csvFile.groupby(['clusterP'])['clusterP'].count().to_dict()
            centroidesP=MParticional.cluster_centers_
            centroidesPDataFrame = pd.DataFrame(centroidesP.round(2), columns=list(dataTableWithoutNan)) if value=="all" else pd.DataFrame(centroidesP.round(4), columns=variables)
            centroidesPList=centroidesPDataFrame.to_dict("records")
            csvFile=csvFile.to_dict("records")
            # Lo pasamos como string para que no ordene automaticamente las llaves
            return {"clustersQuantity":clustersQuantity,"centroidesH":json.dumps(centroidesPList),"tablaGeneral":json.dumps(csvFile)}



