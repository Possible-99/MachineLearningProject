from typing import List, final
from flask import Flask, flash, request, redirect, url_for
from flask_restful import Api, Resource,reqparse
from werkzeug import FileStorage,secure_filename
import os
import pandas as pd 
from apyori import apriori
from scipy.spatial.distance import cdist

app = Flask(__name__)
api = Api(app)

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
            print(resultsObject)
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
            return {}
        return {}




if __name__ == "__main__":
    app.run(debug=True)


