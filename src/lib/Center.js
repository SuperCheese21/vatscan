import Controller from './Controller';

export default class Center extends Controller {
    constructor(data, centerData) {
        super(data);
        this._polygon = centerData.geometry.coordinates[0].map(coords => ({
            latitude: coords[1],
            longitude: coords[0]
        }));
    }

    get polygon() {
        return this._polygon;
    }

    set polygon(polygon) {
        this._polygon = polygon;
    }
}
