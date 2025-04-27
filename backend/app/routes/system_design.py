from fastapi import APIRouter, HTTPException
from app.models.schemas import SystemDesignTemplate
from typing import List, Dict
import uuid

router = APIRouter()

# Dictionary to store system design templates
url_shortener_template = {
    "id": str(uuid.uuid4()),
    "name": "URL Shortener",
    "description": "A system design for a URL shortening service like bit.ly or tinyurl",
    "category": "Web Service",
    "components": [
        {
            "id": "client",
            "type": "client",
            "name": "Client",
            "description": "Web browser or mobile app that sends requests to shorten URLs or access shortened URLs",
            "position": {"x": 100, "y": 200}
        },
        {
            "id": "lb",
            "type": "loadBalancer",
            "name": "Load Balancer",
            "description": "Distributes incoming traffic across multiple web servers",
            "position": {"x": 300, "y": 200}
        },
        {
            "id": "api_server",
            "type": "server",
            "name": "API Server",
            "description": "Handles requests to create short URLs and redirect to original URLs",
            "position": {"x": 500, "y": 200}
        },
        {
            "id": "cache",
            "type": "cache",
            "name": "Cache",
            "description": "In-memory store for frequently accessed URLs to reduce database load",
            "position": {"x": 700, "y": 100}
        },
        {
            "id": "db",
            "type": "database",
            "name": "Database",
            "description": "Stores the mapping between short URLs and original URLs",
            "position": {"x": 700, "y": 300}
        },
        {
            "id": "analytics",
            "type": "service",
            "name": "Analytics Service",
            "description": "Tracks URL access patterns and generates usage statistics",
            "position": {"x": 900, "y": 200}
        }
    ],
    "connections": [
        {
            "id": "conn1",
            "source_id": "client",
            "target_id": "lb",
            "label": "HTTP/HTTPS",
            "type": "request"
        },
        {
            "id": "conn2",
            "source_id": "lb",
            "target_id": "api_server",
            "label": "HTTP",
            "type": "request"
        },
        {
            "id": "conn3",
            "source_id": "api_server",
            "target_id": "cache",
            "label": "GET/SET",
            "type": "dataFlow"
        },
        {
            "id": "conn4",
            "source_id": "api_server",
            "target_id": "db",
            "label": "CRUD",
            "type": "dataFlow"
        },
        {
            "id": "conn5",
            "source_id": "api_server",
            "target_id": "analytics",
            "label": "Events",
            "type": "dataFlow"
        }
    ]
}

# Store templates in memory (in a real app, you would use a database)
system_design_templates = {
    "url-shortener": url_shortener_template
}

@router.get("/templates", response_model=List[Dict])
async def get_all_templates():
    """
    Return a list of all available system design templates
    """
    templates_list = [
        {"id": template_id, "name": template["name"], "description": template["description"], "category": template["category"]}
        for template_id, template in system_design_templates.items()
    ]
    return templates_list

@router.get("/templates/{template_id}", response_model=SystemDesignTemplate)
async def get_template(template_id: str):
    """
    Return detailed information for a specific system design template
    """
    if template_id not in system_design_templates:
        raise HTTPException(status_code=404, detail=f"Template with ID {template_id} not found")
    
    return system_design_templates[template_id]