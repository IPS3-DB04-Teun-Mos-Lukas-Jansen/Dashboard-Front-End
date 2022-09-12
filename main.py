from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
	return {"hello": "world"}


@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}