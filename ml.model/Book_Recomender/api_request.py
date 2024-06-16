from flask import Flask,render_template,request,jsonify
import random
import pickle
import numpy as np

popular_df = pickle.load(open('popular.pkl','rb'))
pt = pickle.load(open('pt.pkl','rb'))
books = pickle.load(open('books.pkl','rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl','rb'))

app = Flask(__name__)

@app.route('/recommend')
def recommend_ui():
    return render_template('recommend.html')

@app.route('/recommend_books',methods=['post'])
def recommend():
    data = request.get_json()  # Get JSON data from request body
    if not data or 'user_input' not in data:
        return jsonify({'error': 'Invalid request. Please provide "user_input" in the JSON body.'}), 400

    user_input = data['user_input']  
    index = np.where(pt.index == user_input)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]
    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        data.append(item)
    for i in range(len(data)):
        if len(data[i]) == 0:
            random_title = random.choice(popular_df['Book-Title'])
            data[i] = [random_title]

    return jsonify({'data': data}), 200

if __name__ == '__main__':
    app.run(debug=True,port=5555)