npm init
npm install express --save
npm install mongodb --save
npm install redis --save
docker run -d -p 6379:6379 --name redis1 redis
docker pull mongo
docker run -d -p 27017:27017 -v ~/data:/data/db mongo

1.POST ==> localhost:8000/book
{
        "title":"t1",
        "author":"a1",
        "text":"tex1"
}

Response:
Saved
2. GET ==> localhost:8000/bookcache/t1
Response :
{
    "_id": "5d7a90babc60d1310da885df",
    "title": "t2",
    "author": "a1",
    "text": "tex1"
}
