export default {
  "name": "bpmn.io colors for BPMN",
  "uri": "http://bpmn.io/schema/bpmn/biocolor/1.0",
  "prefix": "bioc",
  "types": [
    {
      "name": "ColoredShape",
      "extends": [ "bpmndi:BPMNShape" ],
      "properties": [
        {
          "name": "stroke",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "fill",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "ColoredEdge",
      "extends": [ "bpmndi:BPMNEdge" ],
      "properties": [
        {
          "name": "stroke",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "fill",
          "isAttr": true,
          "type": "String"
        }
      ]
    }
  ],
  "enumerations": [],
  "associations": []
}
