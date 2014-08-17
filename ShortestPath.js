// Test the Function - Either run:
// node ShortestPath.js
// - or -
// node ShortestPath.js ["4","A","B","C","D","A-B","B-D","B-C","C-D"]

/**
 * Return the shortest path
 * @param strArr - A string array of the form [N#ofElememts, 0..n nodes, connections-between-nodes]
 * Example:
 *  ["4","A","B","C","D","A-B","B-D","B-C","C-D"]
 *  Number of elements: 4
 *  Elements: A, B, C, D
 *  Connections: A-B, B-D && B-C, C-D
 *  Returns the shortest path between "A" and "D"
 */
function ShortestPath(strArr) {
	var nodeCount = parseInt(strArr[0]),
		startNode = strArr[1],
		endNode = strArr[nodeCount],
		nodeNames = strArr.slice(1, nodeCount + 1),
		nodeConnections = strArr.slice(nodeCount + 1),
		nodeMap = generateNodeMap(nodeNames);

	populateNodeMapWithConnections(nodeMap, nodeConnections);

	return SearchTree(nodeMap, startNode, endNode);
}

// Build out a node map
function generateNodeMap (nodeArray) {
	var nodeTree = {};
	nodeArray.forEach(function(node) {
		nodeTree[node] = {
			'name': node,
			'pointers': []
		};
	});
	return nodeTree;
}

// Fill out the node tree with the nodeConnections that we were passed
function populateNodeMapWithConnections (nodeMap, nodeConnections) {
	nodeConnections.forEach(function(connectionString) {
		var connections = connectionString.split('-'),
			start = connections[0],
			end = connections[1];
		(nodeMap[start]).pointers.push(nodeMap[end]);

		// Bi-directional, need to add pointers both ways
		(nodeMap[end]).pointers.push(nodeMap[start]);
	});
};

// Search through the tree
function SearchTree (nodeMap, startNode, endNode) {

	var current = nodeMap[startNode],
		finishedPaths = [],
		path = [],
		shortestPath;

	// Depth First search with a twist, we continue searching and filling the finished paths array
	depthFirstSearch(current, endNode, path, finishedPaths);

	// Find the shortest path among the finished paths
	finishedPaths.forEach(function(path) {
		if (!shortestPath) {shortestPath = path;}
		if (path.length < shortestPath.length) {
			shortestPath = path;
		}
	});

	if (shortestPath) {
		return shortestPath.join('-');
	}

	// If we got here, the search failed.
	return -1;
};

/**
 * Perform a Depth First Search
 * @param node - The current node that we are searching
 * @param searchValue - the value we are searching for
 * @param currentPath - The current path that we have traversed
 * @param finishedPaths - An array of all finished paths
 */
function depthFirstSearch (node, searchValue, currentPath, finishedPaths) {

	var nodeName = node.name,
		nodePointers = node.pointers || [],
		currentPath = currentPath.slice(0); // Copy the current path

	currentPath.push(nodeName);
	// console.log(nodeName, currentPath, searchValue); // Debug the current evaluated path, kinda fun to look at :)

	if(nodeName === searchValue) {
		finishedPaths.push(currentPath);
	} else if(nodePointers.length) {
		nodePointers.forEach(function(pointerNode) {
			if (currentPath.indexOf(pointerNode.name) === -1) {
				depthFirstSearch(pointerNode, searchValue, currentPath, finishedPaths);
			}
		});
	}
};


// Test the function:

var testString = process.argv[2], // The user's input stringArray
	testStringArr;

if (!testString) {
	defaultTests();
} else {
	testString = testString.substring(1, testString.length-1);
	testStringArr = testString.split(',');
	console.log( ShortestPath(testStringArr) );
}

// Run a bunch of test examples
function defaultTests() {
	var exampleStrArr1 = ["4","A","B","C","D","A-B","B-D","B-C","C-D"],
		exampleStrArr2 = ["7","A","B","C","D","E","F","G","A-B","A-E","B-C","C-D","D-F","E-D","F-G"],
		exampleStrArr3 = ["5","A","B","C","D","F","A-B","A-C","B-C","C-D","D-F"],
		exampleStrArr4 = ["4","X","Y","Z","W","X-Y","Y-Z","X-W"];

	console.log( ShortestPath(exampleStrArr1) );
	console.log( ShortestPath(exampleStrArr2) );
	console.log( ShortestPath(exampleStrArr3) );
	console.log( ShortestPath(exampleStrArr4) );
};