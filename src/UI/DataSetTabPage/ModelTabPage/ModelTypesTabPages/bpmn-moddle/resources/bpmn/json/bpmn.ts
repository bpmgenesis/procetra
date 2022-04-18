export default  {
  "name": "BPMN20",
  "uri": "http://www.omg.org/spec/BPMN/20100524/MODEL",
  "prefix": "bpmn",
  "associations": [],
  "types": [
    {
      "name": "Interface",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "operations",
          "type": "Operation",
          "isMany": true
        },
        {
          "name": "implementationRef",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Operation",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "inMessageRef",
          "type": "Message",
          "isReference": true
        },
        {
          "name": "outMessageRef",
          "type": "Message",
          "isReference": true
        },
        {
          "name": "errorRef",
          "type": "Error",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "implementationRef",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "EndPoint",
      "superClass": [
        "RootElement"
      ]
    },
    {
      "name": "Auditing",
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "GlobalTask",
      "superClass": [
        "CallableElement"
      ],
      "properties": [
        {
          "name": "resources",
          "type": "ResourceRole",
          "isMany": true
        }
      ]
    },
    {
      "name": "Monitoring",
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "Performer",
      "superClass": [
        "ResourceRole"
      ]
    },
    {
      "name": "Process",
      "superClass": [
        "FlowElementsContainer",
        "CallableElement"
      ],
      "properties": [
        {
          "name": "processType",
          "type": "ProcessType",
          "isAttr": true
        },
        {
          "name": "isClosed",
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "auditing",
          "type": "Auditing"
        },
        {
          "name": "monitoring",
          "type": "Monitoring"
        },
        {
          "name": "properties",
          "type": "Property",
          "isMany": true
        },
        {
          "name": "laneSets",
          "isMany": true,
          "replaces": "FlowElementsContainer#laneSets",
          "type": "LaneSet"
        },
        {
          "name": "flowElements",
          "isMany": true,
          "replaces": "FlowElementsContainer#flowElements",
          "type": "FlowElement"
        },
        {
          "name": "artifacts",
          "type": "Artifact",
          "isMany": true
        },
        {
          "name": "resources",
          "type": "ResourceRole",
          "isMany": true
        },
        {
          "name": "correlationSubscriptions",
          "type": "CorrelationSubscription",
          "isMany": true
        },
        {
          "name": "supports",
          "type": "Process",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "definitionalCollaborationRef",
          "type": "Collaboration",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "isExecutable",
          "isAttr": true,
          "type": "Boolean"
        }
      ]
    },
    {
      "name": "LaneSet",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "lanes",
          "type": "Lane",
          "isMany": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Lane",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "partitionElementRef",
          "type": "BaseElement",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "partitionElement",
          "type": "BaseElement"
        },
        {
          "name": "flowNodeRef",
          "type": "FlowNode",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "childLaneSet",
          "type": "LaneSet",
          "xml": {
            "serialize": "xsi:type"
          }
        }
      ]
    },
    {
      "name": "GlobalManualTask",
      "superClass": [
        "GlobalTask"
      ]
    },
    {
      "name": "ManualTask",
      "superClass": [
        "Task"
      ]
    },
    {
      "name": "UserTask",
      "superClass": [
        "Task"
      ],
      "properties": [
        {
          "name": "renderings",
          "type": "Rendering",
          "isMany": true
        },
        {
          "name": "implementation",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Rendering",
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "HumanPerformer",
      "superClass": [
        "Performer"
      ]
    },
    {
      "name": "PotentialOwner",
      "superClass": [
        "HumanPerformer"
      ]
    },
    {
      "name": "GlobalUserTask",
      "superClass": [
        "GlobalTask"
      ],
      "properties": [
        {
          "name": "implementation",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "renderings",
          "type": "Rendering",
          "isMany": true
        }
      ]
    },
    {
      "name": "Gateway",
      "isAbstract": true,
      "superClass": [
        "FlowNode"
      ],
      "properties": [
        {
          "name": "gatewayDirection",
          "type": "GatewayDirection",
          "default": "Unspecified",
          "isAttr": true
        }
      ]
    },
    {
      "name": "EventBasedGateway",
      "superClass": [
        "Gateway"
      ],
      "properties": [
        {
          "name": "instantiate",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "eventGatewayType",
          "type": "EventBasedGatewayType",
          "isAttr": true,
          "default": "Exclusive"
        }
      ]
    },
    {
      "name": "ComplexGateway",
      "superClass": [
        "Gateway"
      ],
      "properties": [
        {
          "name": "activationCondition",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "default",
          "type": "SequenceFlow",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ExclusiveGateway",
      "superClass": [
        "Gateway"
      ],
      "properties": [
        {
          "name": "default",
          "type": "SequenceFlow",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "InclusiveGateway",
      "superClass": [
        "Gateway"
      ],
      "properties": [
        {
          "name": "default",
          "type": "SequenceFlow",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ParallelGateway",
      "superClass": [
        "Gateway"
      ]
    },
    {
      "name": "RootElement",
      "isAbstract": true,
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "Relationship",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "type",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "direction",
          "type": "RelationshipDirection",
          "isAttr": true
        },
        {
          "name": "source",
          "isMany": true,
          "isReference": true,
          "type": "Element"
        },
        {
          "name": "target",
          "isMany": true,
          "isReference": true,
          "type": "Element"
        }
      ]
    },
    {
      "name": "BaseElement",
      "isAbstract": true,
      "properties": [
        {
          "name": "id",
          "isAttr": true,
          "type": "String",
          "isId": true
        },
        {
          "name": "documentation",
          "type": "Documentation",
          "isMany": true
        },
        {
          "name": "extensionDefinitions",
          "type": "ExtensionDefinition",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "extensionElements",
          "type": "ExtensionElements"
        }
      ]
    },
    {
      "name": "Extension",
      "properties": [
        {
          "name": "mustUnderstand",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "definition",
          "type": "ExtensionDefinition",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ExtensionDefinition",
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "extensionAttributeDefinitions",
          "type": "ExtensionAttributeDefinition",
          "isMany": true
        }
      ]
    },
    {
      "name": "ExtensionAttributeDefinition",
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "type",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isReference",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "extensionDefinition",
          "type": "ExtensionDefinition",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ExtensionElements",
      "properties": [
        {
          "name": "valueRef",
          "isAttr": true,
          "isReference": true,
          "type": "Element"
        },
        {
          "name": "values",
          "type": "Element",
          "isMany": true
        },
        {
          "name": "extensionAttributeDefinition",
          "type": "ExtensionAttributeDefinition",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Documentation",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "text",
          "type": "String",
          "isBody": true
        },
        {
          "name": "textFormat",
          "default": "text/plain",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Event",
      "isAbstract": true,
      "superClass": [
        "FlowNode",
        "InteractionNode"
      ],
      "properties": [
        {
          "name": "properties",
          "type": "Property",
          "isMany": true
        }
      ]
    },
    {
      "name": "IntermediateCatchEvent",
      "superClass": [
        "CatchEvent"
      ]
    },
    {
      "name": "IntermediateThrowEvent",
      "superClass": [
        "ThrowEvent"
      ]
    },
    {
      "name": "EndEvent",
      "superClass": [
        "ThrowEvent"
      ]
    },
    {
      "name": "StartEvent",
      "superClass": [
        "CatchEvent"
      ],
      "properties": [
        {
          "name": "isInterrupting",
          "default": true,
          "isAttr": true,
          "type": "Boolean"
        }
      ]
    },
    {
      "name": "ThrowEvent",
      "isAbstract": true,
      "superClass": [
        "Event"
      ],
      "properties": [
        {
          "name": "dataInputs",
          "type": "DataInput",
          "isMany": true
        },
        {
          "name": "dataInputAssociations",
          "type": "DataInputAssociation",
          "isMany": true
        },
        {
          "name": "inputSet",
          "type": "InputSet"
        },
        {
          "name": "eventDefinitions",
          "type": "EventDefinition",
          "isMany": true
        },
        {
          "name": "eventDefinitionRef",
          "type": "EventDefinition",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "CatchEvent",
      "isAbstract": true,
      "superClass": [
        "Event"
      ],
      "properties": [
        {
          "name": "parallelMultiple",
          "isAttr": true,
          "type": "Boolean",
          "default": false
        },
        {
          "name": "dataOutputs",
          "type": "DataOutput",
          "isMany": true
        },
        {
          "name": "dataOutputAssociations",
          "type": "DataOutputAssociation",
          "isMany": true
        },
        {
          "name": "outputSet",
          "type": "OutputSet"
        },
        {
          "name": "eventDefinitions",
          "type": "EventDefinition",
          "isMany": true
        },
        {
          "name": "eventDefinitionRef",
          "type": "EventDefinition",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "BoundaryEvent",
      "superClass": [
        "CatchEvent"
      ],
      "properties": [
        {
          "name": "cancelActivity",
          "default": true,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "attachedToRef",
          "type": "Activity",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "EventDefinition",
      "isAbstract": true,
      "superClass": [
        "RootElement"
      ]
    },
    {
      "name": "CancelEventDefinition",
      "superClass": [
        "EventDefinition"
      ]
    },
    {
      "name": "ErrorEventDefinition",
      "superClass": [
        "EventDefinition"
      ],
      "properties": [
        {
          "name": "errorRef",
          "type": "Error",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "TerminateEventDefinition",
      "superClass": [
        "EventDefinition"
      ]
    },
    {
      "name": "EscalationEventDefinition",
      "superClass": [
        "EventDefinition"
      ],
      "properties": [
        {
          "name": "escalationRef",
          "type": "Escalation",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Escalation",
      "properties": [
        {
          "name": "structureRef",
          "type": "ItemDefinition",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "escalationCode",
          "isAttr": true,
          "type": "String"
        }
      ],
      "superClass": [
        "RootElement"
      ]
    },
    {
      "name": "CompensateEventDefinition",
      "superClass": [
        "EventDefinition"
      ],
      "properties": [
        {
          "name": "waitForCompletion",
          "isAttr": true,
          "type": "Boolean",
          "default": true
        },
        {
          "name": "activityRef",
          "type": "Activity",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "TimerEventDefinition",
      "superClass": [
        "EventDefinition"
      ],
      "properties": [
        {
          "name": "timeDate",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "timeCycle",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "timeDuration",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        }
      ]
    },
    {
      "name": "LinkEventDefinition",
      "superClass": [
        "EventDefinition"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "target",
          "type": "LinkEventDefinition",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "source",
          "type": "LinkEventDefinition",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "MessageEventDefinition",
      "superClass": [
        "EventDefinition"
      ],
      "properties": [
        {
          "name": "messageRef",
          "type": "Message",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "operationRef",
          "type": "Operation",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ConditionalEventDefinition",
      "superClass": [
        "EventDefinition"
      ],
      "properties": [
        {
          "name": "condition",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        }
      ]
    },
    {
      "name": "SignalEventDefinition",
      "superClass": [
        "EventDefinition"
      ],
      "properties": [
        {
          "name": "signalRef",
          "type": "Signal",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Signal",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "structureRef",
          "type": "ItemDefinition",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "ImplicitThrowEvent",
      "superClass": [
        "ThrowEvent"
      ]
    },
    {
      "name": "DataState",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "ItemAwareElement",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "itemSubjectRef",
          "type": "ItemDefinition",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "dataState",
          "type": "DataState"
        }
      ]
    },
    {
      "name": "DataAssociation",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "sourceRef",
          "type": "ItemAwareElement",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "targetRef",
          "type": "ItemAwareElement",
          "isReference": true
        },
        {
          "name": "transformation",
          "type": "FormalExpression",
          "xml": {
            "serialize": "property"
          }
        },
        {
          "name": "assignment",
          "type": "Assignment",
          "isMany": true
        }
      ]
    },
    {
      "name": "DataInput",
      "superClass": [
        "ItemAwareElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isCollection",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "inputSetRef",
          "type": "InputSet",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        },
        {
          "name": "inputSetWithOptional",
          "type": "InputSet",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        },
        {
          "name": "inputSetWithWhileExecuting",
          "type": "InputSet",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "DataOutput",
      "superClass": [
        "ItemAwareElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isCollection",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "outputSetRef",
          "type": "OutputSet",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        },
        {
          "name": "outputSetWithOptional",
          "type": "OutputSet",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        },
        {
          "name": "outputSetWithWhileExecuting",
          "type": "OutputSet",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "InputSet",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "dataInputRefs",
          "type": "DataInput",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "optionalInputRefs",
          "type": "DataInput",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "whileExecutingInputRefs",
          "type": "DataInput",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "outputSetRefs",
          "type": "OutputSet",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "OutputSet",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "dataOutputRefs",
          "type": "DataOutput",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "inputSetRefs",
          "type": "InputSet",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "optionalOutputRefs",
          "type": "DataOutput",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "whileExecutingOutputRefs",
          "type": "DataOutput",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Property",
      "superClass": [
        "ItemAwareElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "DataInputAssociation",
      "superClass": [
        "DataAssociation"
      ]
    },
    {
      "name": "DataOutputAssociation",
      "superClass": [
        "DataAssociation"
      ]
    },
    {
      "name": "InputOutputSpecification",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "dataInputs",
          "type": "DataInput",
          "isMany": true
        },
        {
          "name": "dataOutputs",
          "type": "DataOutput",
          "isMany": true
        },
        {
          "name": "inputSets",
          "type": "InputSet",
          "isMany": true
        },
        {
          "name": "outputSets",
          "type": "OutputSet",
          "isMany": true
        }
      ]
    },
    {
      "name": "DataObject",
      "superClass": [
        "FlowElement",
        "ItemAwareElement"
      ],
      "properties": [
        {
          "name": "isCollection",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        }
      ]
    },
    {
      "name": "InputOutputBinding",
      "properties": [
        {
          "name": "inputDataRef",
          "type": "InputSet",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "outputDataRef",
          "type": "OutputSet",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "operationRef",
          "type": "Operation",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Assignment",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "from",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "to",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        }
      ]
    },
    {
      "name": "DataStore",
      "superClass": [
        "RootElement",
        "ItemAwareElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "capacity",
          "isAttr": true,
          "type": "Integer"
        },
        {
          "name": "isUnlimited",
          "default": true,
          "isAttr": true,
          "type": "Boolean"
        }
      ]
    },
    {
      "name": "DataStoreReference",
      "superClass": [
        "ItemAwareElement",
        "FlowElement"
      ],
      "properties": [
        {
          "name": "dataStoreRef",
          "type": "DataStore",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "DataObjectReference",
      "superClass": [
        "ItemAwareElement",
        "FlowElement"
      ],
      "properties": [
        {
          "name": "dataObjectRef",
          "type": "DataObject",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ConversationLink",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "sourceRef",
          "type": "InteractionNode",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "targetRef",
          "type": "InteractionNode",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "ConversationAssociation",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "innerConversationNodeRef",
          "type": "ConversationNode",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "outerConversationNodeRef",
          "type": "ConversationNode",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "CallConversation",
      "superClass": [
        "ConversationNode"
      ],
      "properties": [
        {
          "name": "calledCollaborationRef",
          "type": "Collaboration",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "participantAssociations",
          "type": "ParticipantAssociation",
          "isMany": true
        }
      ]
    },
    {
      "name": "Conversation",
      "superClass": [
        "ConversationNode"
      ]
    },
    {
      "name": "SubConversation",
      "superClass": [
        "ConversationNode"
      ],
      "properties": [
        {
          "name": "conversationNodes",
          "type": "ConversationNode",
          "isMany": true
        }
      ]
    },
    {
      "name": "ConversationNode",
      "isAbstract": true,
      "superClass": [
        "InteractionNode",
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "participantRef",
          "type": "Participant",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "messageFlowRefs",
          "type": "MessageFlow",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "correlationKeys",
          "type": "CorrelationKey",
          "isMany": true
        }
      ]
    },
    {
      "name": "GlobalConversation",
      "superClass": [
        "Collaboration"
      ]
    },
    {
      "name": "PartnerEntity",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "participantRef",
          "type": "Participant",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "PartnerRole",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "participantRef",
          "type": "Participant",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "CorrelationProperty",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "correlationPropertyRetrievalExpression",
          "type": "CorrelationPropertyRetrievalExpression",
          "isMany": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "type",
          "type": "ItemDefinition",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Error",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "structureRef",
          "type": "ItemDefinition",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "errorCode",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "CorrelationKey",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "correlationPropertyRef",
          "type": "CorrelationProperty",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Expression",
      "superClass": [
        "BaseElement"
      ],
      "isAbstract": false,
      "properties": [
        {
          "name": "body",
          "isBody": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "FormalExpression",
      "superClass": [
        "Expression"
      ],
      "properties": [
        {
          "name": "language",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "evaluatesToTypeRef",
          "type": "ItemDefinition",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Message",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "itemRef",
          "type": "ItemDefinition",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ItemDefinition",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "itemKind",
          "type": "ItemKind",
          "isAttr": true
        },
        {
          "name": "structureRef",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isCollection",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "import",
          "type": "Import",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "FlowElement",
      "isAbstract": true,
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "auditing",
          "type": "Auditing"
        },
        {
          "name": "monitoring",
          "type": "Monitoring"
        },
        {
          "name": "categoryValueRef",
          "type": "CategoryValue",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "SequenceFlow",
      "superClass": [
        "FlowElement"
      ],
      "properties": [
        {
          "name": "isImmediate",
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "conditionExpression",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "sourceRef",
          "type": "FlowNode",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "targetRef",
          "type": "FlowNode",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "FlowElementsContainer",
      "isAbstract": true,
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "laneSets",
          "type": "LaneSet",
          "isMany": true
        },
        {
          "name": "flowElements",
          "type": "FlowElement",
          "isMany": true
        }
      ]
    },
    {
      "name": "CallableElement",
      "isAbstract": true,
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "ioSpecification",
          "type": "InputOutputSpecification",
          "xml": {
            "serialize": "property"
          }
        },
        {
          "name": "supportedInterfaceRef",
          "type": "Interface",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "ioBinding",
          "type": "InputOutputBinding",
          "isMany": true,
          "xml": {
            "serialize": "property"
          }
        }
      ]
    },
    {
      "name": "FlowNode",
      "isAbstract": true,
      "superClass": [
        "FlowElement"
      ],
      "properties": [
        {
          "name": "incoming",
          "type": "SequenceFlow",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "outgoing",
          "type": "SequenceFlow",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "lanes",
          "type": "Lane",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "CorrelationPropertyRetrievalExpression",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "messagePath",
          "type": "FormalExpression"
        },
        {
          "name": "messageRef",
          "type": "Message",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "CorrelationPropertyBinding",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "dataPath",
          "type": "FormalExpression"
        },
        {
          "name": "correlationPropertyRef",
          "type": "CorrelationProperty",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Resource",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "resourceParameters",
          "type": "ResourceParameter",
          "isMany": true
        }
      ]
    },
    {
      "name": "ResourceParameter",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isRequired",
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "type",
          "type": "ItemDefinition",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "CorrelationSubscription",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "correlationKeyRef",
          "type": "CorrelationKey",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "correlationPropertyBinding",
          "type": "CorrelationPropertyBinding",
          "isMany": true
        }
      ]
    },
    {
      "name": "MessageFlow",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "sourceRef",
          "type": "InteractionNode",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "targetRef",
          "type": "InteractionNode",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "messageRef",
          "type": "Message",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "MessageFlowAssociation",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "innerMessageFlowRef",
          "type": "MessageFlow",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "outerMessageFlowRef",
          "type": "MessageFlow",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "InteractionNode",
      "isAbstract": true,
      "properties": [
        {
          "name": "incomingConversationLinks",
          "type": "ConversationLink",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        },
        {
          "name": "outgoingConversationLinks",
          "type": "ConversationLink",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Participant",
      "superClass": [
        "InteractionNode",
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "interfaceRef",
          "type": "Interface",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "participantMultiplicity",
          "type": "ParticipantMultiplicity"
        },
        {
          "name": "endPointRefs",
          "type": "EndPoint",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "processRef",
          "type": "Process",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ParticipantAssociation",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "innerParticipantRef",
          "type": "Participant",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "outerParticipantRef",
          "type": "Participant",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ParticipantMultiplicity",
      "properties": [
        {
          "name": "minimum",
          "default": 0,
          "isAttr": true,
          "type": "Integer"
        },
        {
          "name": "maximum",
          "default": 1,
          "isAttr": true,
          "type": "Integer"
        }
      ],
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "Collaboration",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isClosed",
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "participants",
          "type": "Participant",
          "isMany": true
        },
        {
          "name": "messageFlows",
          "type": "MessageFlow",
          "isMany": true
        },
        {
          "name": "artifacts",
          "type": "Artifact",
          "isMany": true
        },
        {
          "name": "conversations",
          "type": "ConversationNode",
          "isMany": true
        },
        {
          "name": "conversationAssociations",
          "type": "ConversationAssociation"
        },
        {
          "name": "participantAssociations",
          "type": "ParticipantAssociation",
          "isMany": true
        },
        {
          "name": "messageFlowAssociations",
          "type": "MessageFlowAssociation",
          "isMany": true
        },
        {
          "name": "correlationKeys",
          "type": "CorrelationKey",
          "isMany": true
        },
        {
          "name": "choreographyRef",
          "type": "Choreography",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "conversationLinks",
          "type": "ConversationLink",
          "isMany": true
        }
      ]
    },
    {
      "name": "ChoreographyActivity",
      "isAbstract": true,
      "superClass": [
        "FlowNode"
      ],
      "properties": [
        {
          "name": "participantRef",
          "type": "Participant",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "initiatingParticipantRef",
          "type": "Participant",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "correlationKeys",
          "type": "CorrelationKey",
          "isMany": true
        },
        {
          "name": "loopType",
          "type": "ChoreographyLoopType",
          "default": "None",
          "isAttr": true
        }
      ]
    },
    {
      "name": "CallChoreography",
      "superClass": [
        "ChoreographyActivity"
      ],
      "properties": [
        {
          "name": "calledChoreographyRef",
          "type": "Choreography",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "participantAssociations",
          "type": "ParticipantAssociation",
          "isMany": true
        }
      ]
    },
    {
      "name": "SubChoreography",
      "superClass": [
        "ChoreographyActivity",
        "FlowElementsContainer"
      ],
      "properties": [
        {
          "name": "artifacts",
          "type": "Artifact",
          "isMany": true
        }
      ]
    },
    {
      "name": "ChoreographyTask",
      "superClass": [
        "ChoreographyActivity"
      ],
      "properties": [
        {
          "name": "messageFlowRef",
          "type": "MessageFlow",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Choreography",
      "superClass": [
        "Collaboration",
        "FlowElementsContainer"
      ]
    },
    {
      "name": "GlobalChoreographyTask",
      "superClass": [
        "Choreography"
      ],
      "properties": [
        {
          "name": "initiatingParticipantRef",
          "type": "Participant",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "TextAnnotation",
      "superClass": [
        "Artifact"
      ],
      "properties": [
        {
          "name": "text",
          "type": "String"
        },
        {
          "name": "textFormat",
          "default": "text/plain",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Group",
      "superClass": [
        "Artifact"
      ],
      "properties": [
        {
          "name": "categoryValueRef",
          "type": "CategoryValue",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Association",
      "superClass": [
        "Artifact"
      ],
      "properties": [
        {
          "name": "associationDirection",
          "type": "AssociationDirection",
          "isAttr": true
        },
        {
          "name": "sourceRef",
          "type": "BaseElement",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "targetRef",
          "type": "BaseElement",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "Category",
      "superClass": [
        "RootElement"
      ],
      "properties": [
        {
          "name": "categoryValue",
          "type": "CategoryValue",
          "isMany": true
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Artifact",
      "isAbstract": true,
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "CategoryValue",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "categorizedFlowElements",
          "type": "FlowElement",
          "isMany": true,
          "isVirtual": true,
          "isReference": true
        },
        {
          "name": "value",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Activity",
      "isAbstract": true,
      "superClass": [
        "FlowNode"
      ],
      "properties": [
        {
          "name": "isForCompensation",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "default",
          "type": "SequenceFlow",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "ioSpecification",
          "type": "InputOutputSpecification",
          "xml": {
            "serialize": "property"
          }
        },
        {
          "name": "boundaryEventRefs",
          "type": "BoundaryEvent",
          "isMany": true,
          "isReference": true
        },
        {
          "name": "properties",
          "type": "Property",
          "isMany": true
        },
        {
          "name": "dataInputAssociations",
          "type": "DataInputAssociation",
          "isMany": true
        },
        {
          "name": "dataOutputAssociations",
          "type": "DataOutputAssociation",
          "isMany": true
        },
        {
          "name": "startQuantity",
          "default": 1,
          "isAttr": true,
          "type": "Integer"
        },
        {
          "name": "resources",
          "type": "ResourceRole",
          "isMany": true
        },
        {
          "name": "completionQuantity",
          "default": 1,
          "isAttr": true,
          "type": "Integer"
        },
        {
          "name": "loopCharacteristics",
          "type": "LoopCharacteristics"
        }
      ]
    },
    {
      "name": "ServiceTask",
      "superClass": [
        "Task"
      ],
      "properties": [
        {
          "name": "implementation",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "operationRef",
          "type": "Operation",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "SubProcess",
      "superClass": [
        "Activity",
        "FlowElementsContainer",
        "InteractionNode"
      ],
      "properties": [
        {
          "name": "triggeredByEvent",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "artifacts",
          "type": "Artifact",
          "isMany": true
        }
      ]
    },
    {
      "name": "LoopCharacteristics",
      "isAbstract": true,
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "MultiInstanceLoopCharacteristics",
      "superClass": [
        "LoopCharacteristics"
      ],
      "properties": [
        {
          "name": "isSequential",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "behavior",
          "type": "MultiInstanceBehavior",
          "default": "All",
          "isAttr": true
        },
        {
          "name": "loopCardinality",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "loopDataInputRef",
          "type": "ItemAwareElement",
          "isReference": true
        },
        {
          "name": "loopDataOutputRef",
          "type": "ItemAwareElement",
          "isReference": true
        },
        {
          "name": "inputDataItem",
          "type": "DataInput",
          "xml": {
            "serialize": "property"
          }
        },
        {
          "name": "outputDataItem",
          "type": "DataOutput",
          "xml": {
            "serialize": "property"
          }
        },
        {
          "name": "complexBehaviorDefinition",
          "type": "ComplexBehaviorDefinition",
          "isMany": true
        },
        {
          "name": "completionCondition",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "oneBehaviorEventRef",
          "type": "EventDefinition",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "noneBehaviorEventRef",
          "type": "EventDefinition",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "StandardLoopCharacteristics",
      "superClass": [
        "LoopCharacteristics"
      ],
      "properties": [
        {
          "name": "testBefore",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "loopCondition",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "loopMaximum",
          "type": "Integer",
          "isAttr": true
        }
      ]
    },
    {
      "name": "CallActivity",
      "superClass": [
        "Activity",
        "InteractionNode"
      ],
      "properties": [
        {
          "name": "calledElement",
          "type": "String",
          "isAttr": true
        }
      ]
    },
    {
      "name": "Task",
      "superClass": [
        "Activity",
        "InteractionNode"
      ]
    },
    {
      "name": "SendTask",
      "superClass": [
        "Task"
      ],
      "properties": [
        {
          "name": "implementation",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "operationRef",
          "type": "Operation",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "messageRef",
          "type": "Message",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ReceiveTask",
      "superClass": [
        "Task"
      ],
      "properties": [
        {
          "name": "implementation",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "instantiate",
          "default": false,
          "isAttr": true,
          "type": "Boolean"
        },
        {
          "name": "operationRef",
          "type": "Operation",
          "isAttr": true,
          "isReference": true
        },
        {
          "name": "messageRef",
          "type": "Message",
          "isAttr": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ScriptTask",
      "superClass": [
        "Task"
      ],
      "properties": [
        {
          "name": "scriptFormat",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "script",
          "type": "String"
        }
      ]
    },
    {
      "name": "BusinessRuleTask",
      "superClass": [
        "Task"
      ],
      "properties": [
        {
          "name": "implementation",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "AdHocSubProcess",
      "superClass": [
        "SubProcess"
      ],
      "properties": [
        {
          "name": "completionCondition",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "ordering",
          "type": "AdHocOrdering",
          "isAttr": true
        },
        {
          "name": "cancelRemainingInstances",
          "default": true,
          "isAttr": true,
          "type": "Boolean"
        }
      ]
    },
    {
      "name": "Transaction",
      "superClass": [
        "SubProcess"
      ],
      "properties": [
        {
          "name": "protocol",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "method",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "GlobalScriptTask",
      "superClass": [
        "GlobalTask"
      ],
      "properties": [
        {
          "name": "scriptLanguage",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "script",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "GlobalBusinessRuleTask",
      "superClass": [
        "GlobalTask"
      ],
      "properties": [
        {
          "name": "implementation",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "ComplexBehaviorDefinition",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "condition",
          "type": "FormalExpression"
        },
        {
          "name": "event",
          "type": "ImplicitThrowEvent"
        }
      ]
    },
    {
      "name": "ResourceRole",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "resourceRef",
          "type": "Resource",
          "isReference": true
        },
        {
          "name": "resourceParameterBindings",
          "type": "ResourceParameterBinding",
          "isMany": true
        },
        {
          "name": "resourceAssignmentExpression",
          "type": "ResourceAssignmentExpression"
        },
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "ResourceParameterBinding",
      "properties": [
        {
          "name": "expression",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        },
        {
          "name": "parameterRef",
          "type": "ResourceParameter",
          "isAttr": true,
          "isReference": true
        }
      ],
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "ResourceAssignmentExpression",
      "properties": [
        {
          "name": "expression",
          "type": "Expression",
          "xml": {
            "serialize": "xsi:type"
          }
        }
      ],
      "superClass": [
        "BaseElement"
      ]
    },
    {
      "name": "Import",
      "properties": [
        {
          "name": "importType",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "location",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "namespace",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
    {
      "name": "Definitions",
      "superClass": [
        "BaseElement"
      ],
      "properties": [
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "targetNamespace",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "expressionLanguage",
          "default": "http://www.w3.org/1999/XPath",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "typeLanguage",
          "default": "http://www.w3.org/2001/XMLSchema",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "imports",
          "type": "Import",
          "isMany": true
        },
        {
          "name": "extensions",
          "type": "Extension",
          "isMany": true
        },
        {
          "name": "rootElements",
          "type": "RootElement",
          "isMany": true
        },
        {
          "name": "diagrams",
          "isMany": true,
          "type": "bpmndi:BPMNDiagram"
        },
        {
          "name": "exporter",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "relationships",
          "type": "Relationship",
          "isMany": true
        },
        {
          "name": "exporterVersion",
          "isAttr": true,
          "type": "String"
        }
      ]
    }
  ],
  "enumerations": [
    {
      "name": "ProcessType",
      "literalValues": [
        {
          "name": "None"
        },
        {
          "name": "Public"
        },
        {
          "name": "Private"
        }
      ]
    },
    {
      "name": "GatewayDirection",
      "literalValues": [
        {
          "name": "Unspecified"
        },
        {
          "name": "Converging"
        },
        {
          "name": "Diverging"
        },
        {
          "name": "Mixed"
        }
      ]
    },
    {
      "name": "EventBasedGatewayType",
      "literalValues": [
        {
          "name": "Parallel"
        },
        {
          "name": "Exclusive"
        }
      ]
    },
    {
      "name": "RelationshipDirection",
      "literalValues": [
        {
          "name": "None"
        },
        {
          "name": "Forward"
        },
        {
          "name": "Backward"
        },
        {
          "name": "Both"
        }
      ]
    },
    {
      "name": "ItemKind",
      "literalValues": [
        {
          "name": "Physical"
        },
        {
          "name": "Information"
        }
      ]
    },
    {
      "name": "ChoreographyLoopType",
      "literalValues": [
        {
          "name": "None"
        },
        {
          "name": "Standard"
        },
        {
          "name": "MultiInstanceSequential"
        },
        {
          "name": "MultiInstanceParallel"
        }
      ]
    },
    {
      "name": "AssociationDirection",
      "literalValues": [
        {
          "name": "None"
        },
        {
          "name": "One"
        },
        {
          "name": "Both"
        }
      ]
    },
    {
      "name": "MultiInstanceBehavior",
      "literalValues": [
        {
          "name": "None"
        },
        {
          "name": "One"
        },
        {
          "name": "All"
        },
        {
          "name": "Complex"
        }
      ]
    },
    {
      "name": "AdHocOrdering",
      "literalValues": [
        {
          "name": "Parallel"
        },
        {
          "name": "Sequential"
        }
      ]
    }
  ],
  "xml": {
    "tagAlias": "lowerCase",
    "typePrefix": "t"
  }
}