from flask_cors import CORS
from sqlalchemy import DateTime, func, extract
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, send_from_directory
import datetime

app = Flask(__name__, static_url_path='', static_folder='front-end-react/build')
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

# Database Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://qqdxobfltvjitz:ea6348434e3d40c1a6a390a685c13189fad40eaf4be582b99bc515947c14b0a8@ec2-54-242-152-123.compute-1.amazonaws.com:5432/d6fq43a645cefa'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

## Model Creation For Postgres Database
class Policy(db.Model):
  policy_id = db.Column(db.Integer, primary_key=True)
  date_of_purchase = db.Column(DateTime,nullable=False)
  customer_id = db.Column(db.Integer, unique=False, nullable=False)
  fuel = db.Column(db.String(20), unique=False, nullable=False)
  vehicle_Segment = db.Column(db.String(2), unique=False, nullable=False)
  premium = db.Column(db.Integer, unique=False, nullable=False)
  body_injury_liability = db.Column(db.Boolean, default=False, nullable=False)
  personal_injury_protection = db.Column(db.Boolean, default=False, nullable=False)
  property_damage_liability = db.Column(db.Boolean, default=False, nullable=False)
  collision = db.Column(db.Boolean, default=False)
  comprehensive = db.Column(db.Boolean, default=False)
  customer_gender = db.Column(db.String(6), unique=False, nullable=False)
  customer_income_group = db.Column(db.String(20), unique=False, nullable=False)
  customer_region = db.Column(db.String(10), unique=False, nullable=False)
  customer_marital_status = db.Column(db.Boolean, nullable=False)

## Route to Render React Component
@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

## Api Route to Get a Policy Detail
@app.route('/policy_id/<policy_id>', methods=['GET'])
def get_policy_by_id(policy_id):
    policy = Policy.query.get(policy_id)
    if policy:
      del policy.__dict__['_sa_instance_state']
      return jsonify([policy.__dict__])
    else:
      return jsonify([])

## Api Route to Get Policies Count Per Month
@app.route('/policies_per_month/<customer_region>', methods=['GET'])
def get_policies_per_month(customer_region):
  policies_per_month = []
  session = db.session.query( \
    extract('month', Policy.date_of_purchase).label("Month"), \
    func.count(Policy.policy_id)) \
    .filter_by(customer_region=customer_region) \
    .group_by(extract('month', Policy.date_of_purchase).label("Month")) \
    .order_by("Month").all()
  for policy in session:
    policies_per_month.append({ \
        "month":datetime.datetime.strptime(str(int(policy[0])), "%m").strftime("%b"), "policy_count": policy[1] \
      })
  return jsonify(policies_per_month)

## Api Route to PUT updated Policy Details
@app.route('/policy_id/<policy_id>', methods=['PUT'])
def update_policy_id(policy_id):
  body = request.get_json()
  db.session.query(Policy).filter_by(policy_id=policy_id).update(body)
  db.session.commit()
  return "Policy Updated"

## Api Route to get Policu Details by Customer Id
@app.route('/customer_id/<customer_id>', methods=['GET'])
def get_policy_by_cid(customer_id):
  policies = []
  dbsession= db.session.query(Policy).filter_by(customer_id=customer_id).all()
  if dbsession:
    for policy in db.session.query(Policy).filter_by(customer_id=customer_id).all():
      del policy.__dict__['_sa_instance_state']
      policies.append(policy.__dict__)
    return jsonify(policies)
  else:
    return jsonify([])

if __name__ == '__main__':
  db.create_all()
  app.run()
