import { IDataSet } from '../Bussiness/IDataSet';
import { IProject } from '../Bussiness/IProject';
import { Project } from '../Bussiness/Project';
import { IProjectService } from './IProjectService';
import { CvsToJson } from '../Logic/utils/csv2json';
import { Guid, clone, List, Exception, TuvalStorage, Encoding, TCompress, is, Thread, Console, int } from '@tuval/core';
import { XesImporter } from '../Logic/objects/log/importer/xes/importer';
import { EventLog } from '../Logic/objects/log/EventLog';
import { CsvExporter } from '../Logic/objects/log/exporter/csv/exporter';
import { CsvImporter } from '../Logic/objects/log/importer/csv/importer';
import { Desktop } from '@tuval/forms';
import { ProjectSettings } from '../ProjectSettings';
import { ProcessMining } from '../Application';




const separators = [",", ";", "\t"];
export function detectSeparator(csv) {
    var counts = {},
        sepMax;
    separators.forEach(function (sep, i) {
        var re = new RegExp(sep, 'g');
        counts[sep] = (csv.match(re) || []).length;
        sepMax = !sepMax || counts[sep] > counts[sepMax] ? sep : sepMax;
    });
    return sepMax;
}
