from fastapi.testclient import TestClient
from taskboard.main import app

client = TestClient(app)

def test_tasks_empty_list_contract():
    response = client.get("/tasks")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert response.json() == []

