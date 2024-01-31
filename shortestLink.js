function getShortestLink(data, target) {
    const adjacencyList = {};
  
    // Build adjacency list from data
    for (const entry of data) {
      const followers = entry.follows[0];
      for (const follower of entry.follows.slice(1)) {
        if (!adjacencyList[followers]) {
          adjacencyList[followers] = [];
        }
        adjacencyList[followers].push(follower);
      }
    }
  
    const results = [];
  
    // Perform BFS for each target
    for (const t of target) {
      const { from, to } = t;
      const visited = new Set();
      const queue = [[from, []]];
      let linkFound = false;
  
      while (queue.length > 0) {
        const [current, path] = queue.shift();
  
        if (visited.has(current)) continue;
        visited.add(current);
  
        const newPath = path.concat([current]);
  
        if (current === to) {
          results.push({ from, to, path: newPath });
          linkFound = true;
          break;
        }
  
        if (adjacencyList[current]) {
          for (const neighbor of adjacencyList[current]) {
            if (!visited.has(neighbor)) {
              queue.push([neighbor, newPath]);
            }
          }
        }
      }
  
      if (!linkFound) {
        results.push({ from, to, path: "Link not found" });
      }
    }
  
    return results;
  }
  
  const result = getShortestLink(data, target);
  console.log(result);