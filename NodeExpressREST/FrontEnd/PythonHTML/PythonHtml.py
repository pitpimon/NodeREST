from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)

# Base URL for the API

# base_url = "https://api.example.com"
base_url = "http://localhost:3000"

@app.route("/")
def books():
    response = requests.get(base_url + "/books")
    books = response.json()
    return render_template("books.html", books=books)

@app.route("/book/<int:id>")
def book(id):
    response = requests.get(base_url + "/books/" + str(id))
    book = response.json()
    return render_template("book.html", book=book)

@app.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        data = {"title": request.form["title"], "author": request.form["author"]}
        response = requests.post(base_url + "/books", json=data)
        return redirect("/")
    else:
        return render_template("create.html")

@app.route("/update/<int:id>", methods=["GET", "POST"])
def update(id):
    if request.method == "POST":
        data = {"title": request.form["title"], "author": request.form["author"]}
        response = requests.put(base_url + "/books/" + str(id), json=data)
        return redirect("/book/" + str(id))
    else:
        response = requests.get(base_url + "/books/" + str(id))
        book = response.json()
        return render_template("update.html", book=book)

@app.route("/delete/<int:id>")
def delete(id):
    response = requests.delete(base_url + "/books/" + str(id))
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
