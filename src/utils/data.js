const storeName = 'ledis_connection';

export default {
  listConnection() {
    const temp = localStorage.getItem(storeName);
    if (!temp) {
      return [];
    }
    return JSON.parse(temp);
  },

  queryConnection(key) {
    const connections = this.listConnection();
    return connections.filter(item => item.host.indexOf(key) > -1 || item.name.indexOf(key) > -1);
  },

  insertConnection(item) {
    const connections = this.listConnection();
    for (let c of connections) {
      if (c.name === item.name) {
        throw new Error('redis连接名称已存在');
      }
    }
    // 否则 插入数据
    connections.push(item);
    localStorage.setItem(storeName, JSON.stringify(connections));
  },

  deleteConnection(item) {
    const connections = this.listConnection();
    for (let c in connections) {
      if (connections[c].name === item.name) {
        const ans = connections.splice(c, 1);
        localStorage.setItem(storeName, JSON.stringify(ans));
        return;
      }
    }
    throw new Error('该redis记录不存在');
  },
};
