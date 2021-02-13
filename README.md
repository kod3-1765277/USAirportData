# USAirportData
Airport data displayer

# Link
https://kod3-1765277.github.io/USAirportData/

# Description
The primary purpose of this map is to show the airports in the United States and
whether they have control towers or not. There are two primary data sets used
in this map, the `us-states.geojson` data file which includes State boundary
information as well as the number of airports in each State is provided by
[Mike Bostock](http://bost.ocks.org/mike) of [D3](http://d3js.org/). The data
for specific airport locations, names, and control tower availability was given
by [data.gov]( https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile)
in the form of `airports.geojson`.

This map in particular shows the data by
using clickable elements and visual features. Each airport has a broadcast icon
provided by [fontawesome](https://fontawesome.com/), with green indicating
there is a control tower, and black indicating the lack of a control tower. The
map also uses a color feature in each State to show the number of airports as
shown in the clusters from the legend. The States can be clicked, and the top
right corner of the screen will display how many airports there are in the
State. The broadcast towers will show respective airport names when clicked. The map includes a fullscreen option underneath the zooming options. The map also provides a scale bar for reference in the bottom left corner.

This map was made possible also thanks to leaflet, jquery, and a custom plugin
for [fullscreen controls](https://brunob.github.io/leaflet.fullscreen/) provided by [Bruno B](https://github.com/brunob/). The basemap is provided by [CartoDB](https://carto.com/).
