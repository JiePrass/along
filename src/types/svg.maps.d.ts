declare module '@svg-country-maps/indonesia' {
    interface Location {
        id: string;
        name: string;
        path: string;
    }

    interface IndonesiaMap {
        label: string;
        viewBox: string;
        locations: Location[];
    }

    const Indonesia: IndonesiaMap;
    export default Indonesia;
}