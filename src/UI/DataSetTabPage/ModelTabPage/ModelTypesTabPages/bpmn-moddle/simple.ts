import {
    assign
  } from 'min-dash';


  import BpmnPackage from './resources/bpmn/json/bpmn';
  import BpmnDiPackage from './resources/bpmn/json/bpmndi';
  import DcPackage from './resources/bpmn/json/dc';
  import DiPackage from './resources/bpmn/json/di';
  import BiocPackage from './resources/bpmn-io/json/bioc';
  import BpmnInColorPackage from './resources/bpmn-in-color';
import BpmnModdle from './bpmn-moddle';

  var packages = {
    bpmn: BpmnPackage,
    bpmndi: BpmnDiPackage,
    dc: DcPackage,
    di: DiPackage,
    bioc: BiocPackage,
    color: BpmnInColorPackage
  };

  export default function(additionalPackages?, options?) {
    var pks = assign({}, packages, additionalPackages);

    return new BpmnModdle(pks, options);
  }