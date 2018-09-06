import Controller from './Controller';

export default class Center extends Controller {
    constructor(data, centerData) {
        super(data);
        this._polygon = centerData.geometry.coordinates[0].map(coords => ({
            latitude: parseFloat(coords[1]),
            longitude: parseFloat(coords[0])
        }));
    }

    get polygon() {
        return this._polygon;
    }

    set polygon(polygon) {
        this._polygon = polygon;
    }
}
