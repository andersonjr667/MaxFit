from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='../frontend')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit_form', methods=['POST'])
def submit_form():
    data = request.json
    # Aqui você pode processar os dados do formulário
    print(data)
    return jsonify({"status": "success", "message": "Formulário recebido!"})

if __name__ == '__main__':
    app.run(debug=True)