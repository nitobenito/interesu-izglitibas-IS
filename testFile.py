from flask import Flask, json 
import dati
import os 
app = Flask(__name__)
app.config['JSON_AS_ASCII']=False

def izvadaPulcinuInfo(jsonIeraksts):
    for katrs in jsonIeraksts["laiks"]:
        print(katrs)

izvadaPulcinuInfo({"joma":"🎬 Teātra māksla","nosaukums":"Garais deguns","stunduSkaits":3,"vecums":{"no":10,"lidz":16},"skolotajs":"Karabass Barabass","epasts":"gogo@underground.com","talrunis":"29891989","adrese":"Kaktusu aleja 14, Rīga","maxAudzekni":12,
"laiks":[{"diena":"trešdiena","no":"16.00","lidz":"19.00"}]})

def pulcinuLaiki():
  path="dati/pulcini.json"
  if os.path.isfile(path)and os.path.getsize(path) > 0:
      with open(path, "r",  encoding='utf-8' ) as f:
        dati = json.loads(f.read())
      if os.path.isfile("laiki.json")and os.path.getsize("laiki.json") > 0:
          with open("laiki.json", "r", encoding='utf-8') as f:
            laiki = json.loads(f.read()) 
      else:
          laiki=[]
      for d in dati:
        jauns={"pid": d["nosaukums"],"skid": d["skolotajs"]}  
        for laiks in d["laiks"]:
          jauns["diena"]=laiks["diena"]
          jauns["no"]= laiks["no"]
          jauns["lidz"]=laiks["lidz"]
          laiki.append(jauns)

      with open("laiki.json", "w", encoding='utf-8') as f:
        f.write(json.dumps(laiki,ensure_ascii=False))

pulcinuLaiki()