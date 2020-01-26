import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';

export class CSVParser {
    static getData(file: File) {
        return Observable.create(observable => {
            new Papa().parse(file, {
                skipEmptyLines: true,
                complete: function (results) {
                    observable.next(results.data);
                    observable.complete();
                }
            });
        });
    }
}