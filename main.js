document.addEventListener("DOMContentLoaded", function (event) {
    const resizers = Array.from(document.getElementsByClassName('resizer'));
    let block;
    const handleResize = (mouse) => {
        function resizeX(mouse, blockBoundingClientRect) {
            function getNumberOfColumns() {
                const classNamePrefix = 'grid-column-';

                function getColumnsClass(classArray) {
                    return classArray.find((className) => {
                        return className.includes(classNamePrefix)
                    });
                }

                const classArray = Array.from(block.classList.values());
                return parseInt(getColumnsClass(classArray).split(classNamePrefix)[1])
            }

            function shouldIncrementColumns() {
                const differenceInX = mouse.x - (blockBoundingClientRect.x + blockBoundingClientRect.width)
                const increment = blockBoundingClientRect.width / numberOfColumns

                return differenceInX > increment;
            }

            function shouldDecrementColumns() {
                const differenceInX = (blockBoundingClientRect.x + blockBoundingClientRect.width) - mouse.x
                const increment = blockBoundingClientRect.width / numberOfColumns

                return differenceInX > increment;
            }

            const numberOfColumns = getNumberOfColumns()

            if (shouldIncrementColumns()) {
                const numberOfColumnsPlusOne = numberOfColumns + 1
                block.classList.replace(`grid-column-${numberOfColumns}`, `grid-column-${numberOfColumnsPlusOne}`)
            }
            if (shouldDecrementColumns()) {
                const numberOfColumnsMinusOne = Math.max(numberOfColumns - 1, 0)
                block.classList.replace(`grid-column-${numberOfColumns}`, `grid-column-${numberOfColumnsMinusOne}`)
            }
        }

        function resizeY(mouse, blockBoundingClientRect) {
            function getNumberOfRows() {
                const classNamePrefix = 'grid-row-';

                function getRowsClass(classArray) {
                    return classArray.find((className) => {
                        return className.includes(classNamePrefix)
                    });
                }

                const classArray = Array.from(block.classList.values());
                return parseInt(getRowsClass(classArray).split(classNamePrefix)[1])
            }

            function shouldIncrementRows() {
                const differenceInY = mouse.y - (blockBoundingClientRect.y + blockBoundingClientRect.height)
                const increment = blockBoundingClientRect.height / numberOfRows

                return differenceInY > increment;
            }

            function shouldDecrementRows() {
                const differenceInY = (blockBoundingClientRect.y + blockBoundingClientRect.height) - mouse.y
                const increment = blockBoundingClientRect.height / numberOfRows

                return differenceInY > increment;
            }

            const numberOfRows = getNumberOfRows()

            if (shouldIncrementRows()) {
                const numberOfRowsPlusOne = numberOfRows + 1
                block.classList.replace(`grid-row-${numberOfRows}`, `grid-row-${numberOfRowsPlusOne}`)
            }
            if (shouldDecrementRows()) {
                const numberOfRowsMinusOne = Math.max(numberOfRows - 1, 0)
                block.classList.replace(`grid-row-${numberOfRows}`, `grid-row-${numberOfRowsMinusOne}`)
            }
        }

        if (block) {
            const blockBoundingClientRect = block.getBoundingClientRect();

            resizeX(mouse, blockBoundingClientRect);
            resizeY(mouse, blockBoundingClientRect);
        }
    }

    resizers.forEach(function (resizer) {
        resizer.addEventListener('mousedown', function () {
            block = resizer.parentElement;
            block.classList.add('resizing');
            document.addEventListener("mousemove", handleResize)
        });
    });

    document.addEventListener('mouseup', () => {
        block.classList.remove('resizing');
        document.removeEventListener('mousemove', handleResize);
    })
});
