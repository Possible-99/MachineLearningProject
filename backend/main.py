from typing import List
from flask import Flask, flash, request, redirect, url_for
from flask_restful import Api, Resource,reqparse
from werkzeug import FileStorage,secure_filename
import os
import pandas as pd 
from apyori import apriori


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
    
    for item in results:
        emparejar=item[0]
        items=[x for x in emparejar]
        resultsObject["rules"].append({"items":list(item[0]),"support":item[1],"confidence":item[2][0][2],"lift":item[2][0][3]})
    return resultsObject


@app.route('/api/priori', methods=['POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        data=request.form.to_dict()
        print(data)
        if file:
            csvFile=pd.read_csv(file, header=None)
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

if __name__ == "__main__":
    app.run(debug=True)


