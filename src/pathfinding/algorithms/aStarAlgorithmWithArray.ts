import AStarAlgorithm from './aStarAlgorithm';
import Node from './node';
import PathResult from './pathResult';

export default class AStarAlgorithmWithArray extends AStarAlgorithm {

    protected getPath(): PathResult {

        const openList = new Array<Node>();
        const closedList = new Array<Node>();
        const startNode = new Node(this.map.start);
        startNode.g = 0;
        startNode.f = startNode.g + this.heuristic(startNode.tile);
        openList.push(startNode);

        while (openList.length !== 0) {

            const current = this.findLowestF(openList);
            const currentNode = current.node;

            if (currentNode.tile === this.map.end) {
                return new PathResult(this.constructPath(currentNode), openList, closedList);
            }

            openList.splice(current.index, 1);
            closedList.push(currentNode);
            this.addValidNeighborsToOpenList(currentNode, openList, closedList);
        }

        return undefined;
    }

    private addValidNeighborsToOpenList(currentNode: Node, openList: Node[], closedList: Node[]) {
        for (let r = -1; r < 2; r++) {
            for (let c = -1; c < 2; c++) {
                if (r === 0 && c === 0) {
                    continue;
                }

                const neighbourTile = this.map.tiles.find((tile) => tile.row === currentNode.tile.row + r &&
                    tile.col === currentNode.tile.col + c);
                if (!neighbourTile || neighbourTile.isObstacle) {
                    continue;
                }

                const clnode = closedList.find((node) => node.tile === neighbourTile);
                if (clnode) { // if this neighbour is in the closed list
                    continue;
                }

                const neighbour = new Node(neighbourTile);
                neighbour.parent = currentNode;
                neighbour.g = currentNode.g + 1; // all directions have the same cost (1)
                neighbour.f = neighbour.g + this.heuristic(neighbourTile);

                const olnode = openList.find((node) => node.tile === neighbourTile);
                if (!olnode) {
                    openList.push(neighbour);
                } else if (neighbour.g < olnode.g) {
                    olnode.g = neighbour.g;
                    olnode.parent = neighbour.parent;
                }
            }
        }
    }

    private constructPath(endNode: Node): Node[] {

        const path = new Array<Node>();
        let currentNode = endNode;
        path.push(currentNode);

        while (currentNode.parent) {
            currentNode = currentNode.parent;
            path.push(currentNode);
        }

        return path;
    }

}
