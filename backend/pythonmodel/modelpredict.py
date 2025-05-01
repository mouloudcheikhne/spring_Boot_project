from flask import Flask, request, jsonify
import numpy as np
import random
from datetime import datetime, timedelta

app = Flask(__name__)

import numpy as np

from sklearn.linear_model import LinearRegression


data = []
agents = [1, 5, 9]


def jours_dans_mois(mois, annee):
    if mois == 2:

        if (annee % 4 == 0 and annee % 100 != 0) or (annee % 400 == 0):
            return 29
        else:
            return 28
    elif mois in [4, 6, 9, 11]:
        return 30
    else:
        return 31


def trinig(C):
    for agent in agents:
        for mois in range(1, 13):
            jours_max = jours_dans_mois(mois, 2023)
            for jour in range(1, jours_max + 1):
                nomber_normal_tiktes = agent * 2 + jour * 0.5 + mois * 1.5
                # print(nomber_normal_tiktes)
                tickets = int(nomber_normal_tiktes + random.uniform(-2, 2))
                # print(tickets)
                date = f"{jour}-{mois}-2023"
                data.append([agent, date, tickets])


trinig(agents)

dates = [datetime.strptime(ligne[1], "%d-%m-%Y") for ligne in data]

# print(dates)
g = [agent[0] for agent in data]
# print(g)
jours = np.array([d.day for d in dates])
month = np.array([d.month for d in dates])
# print(jours)


X = np.array([[g[i], jours[i], month[i]] for i in range(len(data))])
# print(X)

y = np.array([ligne[2] for ligne in data])


model = LinearRegression()
model.fit(X, y)
r2 = model.score(X, y)
print(f"R² = {r2:.3f}")

# s = "2/12/2025"
# datepredict = datetime.strptime(s, "%d/%m/%Y")
# predic = np.array([1,datepredict.day, datepredict.month])
# print(predic)
# print(f"predict={model.predict(predic)[0]}")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        agent = data["agent"]
        date_str = data["date"]
        date = datetime.strptime(date_str, "%d-%m-%Y")

        x_test = np.array([[int(agent), date.day, date.month]])

        prediction = model.predict(x_test)[0]

        return jsonify({"prediction": prediction}), 200
    except Exception as e:
        return jsonify({"error": "Erreur interne du serveur: " + str(e)}), 500


@app.route("/predict/toutagent", methods=["POST"])
def predict_tout_agent():
    try:
        data = request.get_json()
        date_str = data["date"]
        date = datetime.strptime(date_str, "%d-%m-%Y")

        predict_tout = []
        for i in agents:
            prediction = model.predict(np.array([[int(i), date.day, date.month]]))[0]
            predict_tout.append({"agent": i, "prediction": prediction})

        return jsonify(predict_tout), 200
    except Exception as e:
        return jsonify({"error": "Erreur interne du serveur"}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
