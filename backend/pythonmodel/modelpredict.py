# python-ml-api/app.py
from flask import Flask, request, jsonify
import numpy as np
import random
from datetime import datetime, timedelta

app = Flask(__name__)

import numpy as np
from sklearn.ensemble import RandomForestRegressor


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
    for i in range(5):
        for j in C:
            for k in range(12):
                stoke = []
                mois = k + 1
                annee = 2021 + (k + 1)
                max_jour = jours_dans_mois(mois, annee)
                jour = random.randint(1, max_jour)
                date = f"{jour}-{mois}-{annee}"

                if j == 1:
                    if jour <= 10:
                        nomber_tickte = random.randint(20, 35)
                    else:
                        nomber_tickte = random.randint(8, 15)
                elif j == 5:
                    if jour > 10 and jour <= 20:
                        nomber_tickte = random.randint(20, 35)
                    else:
                        nomber_tickte = random.randint(8, 15)
                else:
                    if jour > 20:
                        nomber_tickte = random.randint(20, 35)
                    else:
                        nomber_tickte = random.randint(8, 15)

                stoke.append(j)
                stoke.append(date)
                stoke.append(nomber_tickte)
                data.append(stoke)


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


model = RandomForestRegressor()
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
        print(f"Erreur : {str(e)}")
        return jsonify({"error": "Erreur interne du serveur: " + str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
