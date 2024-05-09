#include <bits/stdc++.h>
using namespace std;

void bfs(vector<vector<int>> &vis, vector<vector<int>> &dist, vector<vector<int>> &grid){

    int m = grid.size();
    int n = grid[0].size();
    queue<pair<pair<int, int>, int>> q;

    for (int row = 0; row < m; row++){
        for (int col = 0; col < n; col++){
            if (grid[row][col] == 1){
                q.push({{row,col},0});
                vis[row][col]=1;
            }
            else
                vis[row][col] = 0;
        }
    }

    while (!q.empty()){
        int row = q.front().first.first;
        int col = q.front().first.second;
        int steps = q.front().second;
        q.pop();
        dist[row][col] = steps;
        int r1[] = {-1, 0, 1, 0};
        int c1[] = {0, 1, 0, -1};
        for (int i = 0; i < 4; i++){
            int nrow = row + r1[i];
            int ncol = col + c1[i];
            if (nrow >= 0 && nrow < m && ncol >= 0 && ncol < n && vis[nrow][ncol] == 0){
                q.push({{nrow, ncol}, steps + 1});
                vis[nrow][ncol] = 1;
            }
        }
    }
}

vector<vector<int>> nearest(vector<vector<int>> &grid){
    int m = grid.size();
    int n = grid[0].size();
    vector<vector<int>> vis(m, vector<int>(n, 0));
    vector<vector<int>> dist(m, vector<int>(n, 0));
    bfs(vis,dist,grid);
    return dist;
}

int main(){
    vector<vector<int>> grid = {{0, 1, 1, 0}, 
                                {1, 1, 0, 0}, 
                                {0, 0, 1, 1}};
    vector<vector<int>> ans = nearest(grid);
    for (auto i : ans){
        for (auto j : i){
            cout << j << " ";
        }
        cout << "\n";
    }
}