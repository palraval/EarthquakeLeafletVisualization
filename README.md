# EarthquakeLeafletVisualization

The earthquake data from the past week is found from the USGS website. This JSON data is then imported to create a map which contains plots of all the earthquakes in the dataset according to their latitude and longitude values. Circle markers are used to indicate each of the earthquakes. The markers are customized according to a couple data properties for each earthquake:

* The size is proportional to the magnitude of the earthquake. More specifically, an earthquake with a larger magnitude will have a larger marker size compared to an earthquake with a smaller magnitude.

* The color of each marker is selected based on each earthquake's depth value. A legend is provided on the top-right side of the map to help the user understand what each marker's color represents. 

- The marker will have a red color if the depth value is less than or equal to 125.33
- The marker will have an orange color if the depth value is in the range of 125.33 to 250.66
- The marker will have a yellow color if the depth value is in the range of 250.66 to 375.99
- The marker will have a green color if the depth value is in the range of 375.99 to 501.32
- The marker will have a blue color if the depth value is greater than or equal to 501.32


Lastly, each marker also contains a popup which provides information regarding the magnitude, location, and depth of each earthquake. 



