TARGET_FILE = ../dist/doodlchart.min.js

ROLLUP_CONFIG = ../rollup.config.js

GENERAL_SOURCE_FILES = \
	base.ts \
	doodl.ts 

CHART_SOURCE_FILES = \
	areachart.ts \
	barchart.ts \
	bollinger.ts \
	boxplot.ts \
	bubblechart.ts \
	chord.ts \
	contour.ts \
	dendrogram.ts \
	disjoint.ts \
	dotplot.ts \
	force.ts \
	gantt.ts \
	grouped_barchart.ts \
	heatmap.ts \
	linechart.ts \
	multi_linechart.ts \
	piechart.ts \
	piegrid.ts \
	placeholder.ts \
	scatterplot.ts \
	radial_areachart.ts \
	skey.ts \
	stacked_areachart.ts \
	stacked_barchart.ts \
	tree.ts \
	treemap.ts \
	vennchart.ts \
	voronoi.ts 

SOURCE_FILES = $(GENERAL_SOURCE_FILES) $(CHART_SOURCE_FILES)

all: $(TARGET_FILE)

clean:
	rm -f $(TARGET_FILE)

$(TARGET_FILE): $(SOURCE_FILES) $(ROLLUP_CONFIG)
	cd .. && npx rollup -c

force: clean all