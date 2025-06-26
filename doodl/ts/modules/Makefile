GENERATED_FILE_NAMES = \
	index.ts \

GENERATED_FILES = $(patsubst %, ../%, $(GENERATED_FILE_NAMES))
TARGET_FILE = ../dist/doodlchart.js

SOURCE_FILES = \
	base.ts \
	barchart.ts \
	bollinger.ts \
	boxplot.ts \
	chord.ts \
	dotplot.ts \
	force.ts \
	gantt.ts \
	heatmap.ts \
	linechart.ts \
	piechart.ts \
	scatterplot.ts \
	skey.ts \
	tree.ts \
	treemap.ts \
	venn.ts \
	disjoint.ts \
	dendrogram.ts \
	contour.ts \
	area.ts \
	bubblechart.ts \
	voronoi.ts \

all: $(TARGET_FILE)

clean:
	rm -f $(GENERATED_FILES) $(TARGET_FILE) ../index.ts~

$(TARGET_FILE): $(GENERATED_FILES)
	cd .. && npx rollup -c


../index.ts: $(SOURCE_FILES)
	@ echo Building bundle

	@if [ -f $@ ]; then mv $@ $@~;  fi;
	@echo "// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!\n// Generated `date`\n" > $@

	@for f in $^; do \
	    echo "\n/// $$f\n"; \
	    cat $$f; \
	done >> $@

../index-try.ts: $(SOURCE_FILES)
	@ echo Building bundle

	@if [ -f $@ ]; then mv $@ $@~;  fi;
	@echo "// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!\n// Generated `date`\n" > $@

	# Make a list of the unique imports in all files

	@for f in $^; do \
		grep '^import' $$f \
	done | sort | uniq >>  $@

	# Now concatenate everything but the imports

	@for f in $^; do \
	    echo "\n/// $$f\n"; \
	    grep -v '^import' $$f \
	done >> $@
