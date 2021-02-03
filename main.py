from flask import Flask, render_template, jsonify
from datetime import datetime


app = Flask(__name__)
app.config['JSON_AS_ASCII']=False


@app.route('/')
def index():
  return render_template('index.html')

@app.route('/tabula')
def uzTabulu():
  return render_template('tabula.html')

@app.route('/pulcinu_saraksts')
def pulcSar():
  return render_template('pulcinu_saraksts.html')

@app.route('/skolenu_izvelne')
def time():
  now = datetime.now() # current date and time
  date_time = now.strftime("%d/%m/%Y, %H:%M:%S")
  return render_template('skolenu_izvelne.html', date_time=date_time)

def skIzvele():
  return render_template('skolenu_izvelne.html')

@app.route('/pub_data')
def pub_dati():
  return render_template('pub_data.html')

@app.route('/IIC')
def iic():
  return render_template('IIC.html')  


@app.route('/vecaku_pieteikums')
def vPieteikums():
  return render_template('vecaku_pieteikums.html')

@app.route('/registret_IIC')
def regIIC():
  return 1

if __name__ == "__main__":
   app.run("0.0.0.0", debug=True)