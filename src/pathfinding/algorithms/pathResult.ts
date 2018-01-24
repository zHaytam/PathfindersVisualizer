import Node from './node';

export default class PathResult {

    public path: Node[];
    public openList: Node[];
    public closedList: Node[];

    constructor(path: Node[], openList: Node[], closedList: Node[]) {
        this.path = path;
        this.openList = openList;
        this.closedList = closedList;
    }

}
