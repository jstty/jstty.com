import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

export default class PhotoTreeMap extends React.Component {

    buildTree() {
        var color = d3.scale.category10();

        var canvas = d3.select('.d3-container').append('svg')
            .attr('width', 500)
            .attr('height', 500);

        d3.json("/api/photos/tree/map", function(data){

            var treemap = d3.layout.treemap()
                .size([500, 500])
                .nodes(data);

            var cells = canvas.selectAll(".cell")
                .data(treemap)
                .enter()
                .append("g")
                .attr('class', 'cell');

                cells.append('rect')
                    .attr('x', d => d.x )
                    .attr('y', d => d.y )
                    .attr('width', d => d.dx )
                    .attr('height', d => d.dy )
                    .attr('fill', d => d.children ? null : color(d.parent.name) )
                    .attr('stroke', '#ffffff' );

                cell.append('text')
                    .attr('x', d => d.x + d.dx/2 )
                    .attr('y', d => d.y + d.dy/2 )
                    .attr('text-anchor', 'midlde')
                    .text(d => d.children ? null : d.name);

        })
    }

    componentDidMount() {
        this.buildTree();
    }

    render() {
        return (
            <div className="treemap">
                <div className="d3-container"></div>
            </div>
        )
    }
}