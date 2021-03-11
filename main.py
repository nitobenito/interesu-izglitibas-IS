from flask import Flask, render_template, jsonify,json ,request, make_response
import dati
import os

app = Flask(__name__)
app.config['JSON_AS_ASCII']=False


@app.route('/')
def index():
  return render_template('index.html')

@app.route('/skolenu_izvelne')
def skIzvele():
  return render_template('skolenu_izvelne.html')

@app.route('/izvelu_atlase',methods=['POST'])
def izvAtl():
  jaunaAtlase = json.loads(request.data)
  print(jaunaAtlase["joma"])
  dati = []
  path="dati/pulcini.json"
  if os.path.isfile(path) and os.path.getsize(path) > 0:
    with open("dati/pulcini.json", "r", encoding='utf-8') as f:
      dati = json.loads(f.read())
    atbilde = []  
    for d in dati:
      
      if d["joma"]==jaunaAtlase["joma"]:
        atbilde.append(d)
    return jsonify(atbilde)  
  return "10032021"

@app.route('/IIC')
def iic():
  return render_template('IIC.html')  
  
@app.route('/vecaku_pieteikums')
def vPieteikums():
  return render_template('vecaku_pieteikums.html')

@app.route('/registret_IIC',methods=['POST'])
def regIIC():
  dati = []
  path="dati/iic.json"
  if os.path.isfile(path) and os.path.getsize(path) > 0:
    with open("dati/iic.json", "r", encoding='utf-8') as f:
      dati = json.loads(f.read())
  jaunsIIC= json.loads(request.data)
  print(jaunsIIC["iicnosaukums"])
  for d in dati:
    if d["iicnosaukums"]==jaunsIIC["iicnosaukums"]:
      return "ddddddddddddddddddddddd"
     
  dati.append(jaunsIIC)
  with open("dati/iic.json", "w", encoding='utf-8') as f:
    f.write(json.dumps(dati))
 # return jsonify(jaunsIIC)
    return "asdlkgjdflkhjgl"

if __name__ == "__main__":
   app.run("0.0.0.0", debug=True)