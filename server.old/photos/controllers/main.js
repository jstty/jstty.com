module.exports = PhotosCtrl;

function PhotosCtrl($logger){
    $logger.log('JStty - Photos Ctrl Init');
}

// localhost:8000/api/photos
PhotosCtrl.prototype.index = function(db, $done)
{
    return db.getFileList();
};

// localhost:8000/api/photos/tree
PhotosCtrl.prototype.tree = function(db, $done)
{
    return db.getTree();
};

// localhost:8000/api/photos/tree/map
PhotosCtrl.prototype.treeMap = function(db, $done)
{
    $done(
        {
            "name": "photos",
            "children": [
                {
                    "name": "best of",
                    "children": [
                        {
                            "name": "2007",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/acidburn.jpg",
                            "children": [
                                {"name": "AgglomerativeCluster", "value": 3938},
                                {"name": "CommunityStructure", "value": 3812},
                                {"name": "HierarchicalCluster", "value": 6714},
                                {"name": "MergeEdge", "value": 743}
                            ]
                        },
                        {
                            "name": "2008",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/acidwash.jpg",
                            "children": [
                                {"name": "BetweennessCentrality", "value": 3534},
                                {"name": "LinkDistance", "value": 5731},
                                {"name": "MaxFlowMinCut", "value": 7840},
                                {"name": "ShortestPaths", "value": 5914},
                                {"name": "SpanningTree", "value": 3416}
                            ]
                        },
                        {
                            "name": "2009",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/darksky.jpg",
                            "children": [
                                {"name": "AspectRatioBanker", "value": 7074},
                                {"name": "ISchedulable", "value": 1041},
                                {"name": "Parallel", "value": 5176},
                                {"name": "Pause", "value": 449},
                                {"name": "Scheduler", "value": 5593},
                                {"name": "Sequence", "value": 5534},
                                {"name": "Transition", "value": 9201},
                                {"name": "Transitioner", "value": 19975},
                                {"name": "TransitionEvent", "value": 1116},
                                {"name": "Tween", "value": 6006}
                            ]
                        }
                    ]
                },
                {
                    "name": "by year",
                    "children": [
                        {
                            "name": "2007",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/darksky.jpg",
                            "children": [
                                {"name": "ArrayInterpolator", "value": 1983},
                                {"name": "ColorInterpolator", "value": 2047},
                                {"name": "DateInterpolator", "value": 1375},
                                {"name": "Interpolator", "value": 8746},
                                {"name": "MatrixInterpolator", "value": 2202},
                                {"name": "NumberInterpolator", "value": 1382},
                                {"name": "ObjectInterpolator", "value": 1629},
                                {"name": "PointInterpolator", "value": 1675},
                                {"name": "RectangleInterpolator", "value": 2042}
                            ]
                        },
                        {
                            "name": "2008",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/forgotten.jpg",
                            "children": [
                                {"name": "DataField", "value": 1759},
                                {"name": "DataSchema", "value": 2165},
                                {"name": "DataSet", "value": 586},
                                {"name": "DataSource", "value": 3331},
                                {"name": "DataTable", "value": 772},
                                {"name": "DataUtil", "value": 3322}
                            ]
                        },
                        {
                            "name": "2009",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/lady_in_white.jpg",
                            "children": [
                                {"name": "DirtySprite", "value": 8833},
                                {"name": "LineSprite", "value": 1732},
                                {"name": "RectSprite", "value": 3623},
                                {"name": "TextSprite", "value": 10066}
                            ]
                        },
                        {
                            "name": "2010",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/looming.jpg",
                            "children": [
                                {"name": "DragForce", "value": 1082},
                                {"name": "GravityForce", "value": 1336},
                                {"name": "IForce", "value": 319},
                                {"name": "NBodyForce", "value": 10498},
                                {"name": "Particle", "value": 2822},
                                {"name": "Simulation", "value": 9983},
                                {"name": "Spring", "value": 2213},
                                {"name": "SpringForce", "value": 1681}
                            ]
                        }
                    ]
                },
                {
                    "name": "by location",
                    "children": [
                        {
                           "name": "Bakersfield",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/lost.jpg",
                            "children": [
                                {"name": "AggregateExpression", "value": 1616},
                                {"name": "And", "value": 1027},
                                {"name": "Arithmetic", "value": 3891},
                                {"name": "Average", "value": 891},
                                {"name": "BinaryExpression", "value": 2893},
                                {"name": "Comparison", "value": 5103},
                                {"name": "CompositeExpression", "value": 3677},
                                {"name": "Count", "value": 781},
                                {"name": "DateUtil", "value": 4141},
                                {"name": "Distinct", "value": 933},
                                {"name": "Expression", "value": 5130},
                                {"name": "ExpressionIterator", "value": 3617},
                                {"name": "Fn", "value": 3240},
                                {"name": "If", "value": 2732},
                                {"name": "IsA", "value": 2039},
                                {"name": "Literal", "value": 1214},
                                {"name": "Match", "value": 3748},
                                {"name": "Maximum", "value": 843}
                            ]
                        },
                        {
                            "name": "LA",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/noise.jpg",
                            "children": [
                                {"name": "add", "value": 593},
                                {"name": "and", "value": 330},
                                {"name": "average", "value": 287},
                                {"name": "count", "value": 277},
                                {"name": "distinct", "value": 292},
                                {"name": "div", "value": 595},
                                {"name": "eq", "value": 594},
                                {"name": "fn", "value": 460},
                                {"name": "gt", "value": 603},
                                {"name": "gte", "value": 625},
                                {"name": "iff", "value": 748},
                                {"name": "isa", "value": 461},
                                {"name": "lt", "value": 597},
                                {"name": "lte", "value": 619},
                                {"name": "max", "value": 283},
                                {"name": "min", "value": 283},
                                {"name": "mod", "value": 591},
                                {"name": "mul", "value": 603},
                                {"name": "neq", "value": 599},
                                {"name": "not", "value": 386},
                                {"name": "or", "value": 323},
                                {"name": "orderby", "value": 307},
                                {"name": "range", "value": 772},
                                {"name": "select", "value": 296},
                                {"name": "stddev", "value": 363},
                                {"name": "sub", "value": 600},
                                {"name": "sum", "value": 280},
                                {"name": "update", "value": 307},
                                {"name": "variance", "value": 335},
                                {"name": "where", "value": 299},
                                {"name": "xor", "value": 354},
                                {"name": "_", "value": 264}
                            ]
                        },
                        {
                            "name": "San Jose",
                            "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/overworld.jpg",
                            "children": [
                                {"name": "Minimum", "value": 843},
                                {"name": "Not", "value": 1554},
                                {"name": "Or", "value": 970},
                                {"name": "Query", "value": 13896},
                                {"name": "Range", "value": 1594},
                                {"name": "StringUtil", "value": 4130},
                                {"name": "Sum", "value": 791},
                                {"name": "Variable", "value": 1124},
                                {"name": "Variance", "value": 1876},
                                {"name": "Xor", "value": 1101}
                            ]
                        }
                    ]
                },
                {
                    "name": "print ready",
                    "image": "https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/trapped.jpg",
                    "children": [
                        {"name": "IScaleMap", "value": 2105},
                        {"name": "LinearScale", "value": 1316},
                        {"name": "LogScale", "value": 3151},
                        {"name": "OrdinalScale", "value": 3770},
                        {"name": "QuantileScale", "value": 2435},
                        {"name": "QuantitativeScale", "value": 4839},
                        {"name": "RootScale", "value": 1756},
                        {"name": "Scale", "value": 4268},
                        {"name": "ScaleType", "value": 1821},
                        {"name": "TimeScale", "value": 5833}
                    ]
                }
            ]
        }

    )
};
