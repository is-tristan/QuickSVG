// client-logic.js
document.addEventListener("DOMContentLoaded", () => {

  const settings = () => {

    const render = document.getElementById("render");
    const previewSvg = document.getElementById("preview").querySelector("svg");

    /**
     * Hex to RGB
     */
    const fullHex = (hex) => {
      let r = hex.slice(1, 2);
      let g = hex.slice(2, 3);
      let b = hex.slice(3, 4);

      r = parseInt(r + r, 16);
      g = parseInt(g + g, 16);
      b = parseInt(b + b, 16);

      return { r, g, b };

    }

    // Cconvert hex to rgb
    const hex2rgb = (hex) => {
      if (hex.length === 4) {
        return fullHex(hex);
      }

      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      return { r, g, b };

    }

    /**
     * fill Color
     */
    const fillColor = document.getElementById("fillColor");
    const fillColorValue = document.getElementById("fillColorValue");

    fillColor.addEventListener("input", () => {

      fillColorValue.innerText = fillColor.value;

      previewSvg.setAttribute("fill", fillColor.value);

      if (hex2rgb(fillColor.value).r > 190 && hex2rgb(fillColor.value).g > 190 && hex2rgb(fillColor.value).b > 190) {
        render.style.backgroundColor = "#273036";
      } else {
        render.style.backgroundColor = "transparent";
      }

    });

    // Set the default colours to their divs
    const quickFillItems = document.querySelectorAll(".quickFillColour");

    quickFillItems.forEach((color) => {

      const quickFillColour = color.getAttribute("data-color");

      color.style.backgroundColor = quickFillColour;

      color.addEventListener("click", () => {

        fillColor.value = quickFillColour;

        fillColorValue.innerText = quickFillColour;

        previewSvg.setAttribute("fill", quickFillColour);

        // If colour is light set the background to dark
        if (hex2rgb(fillColor.value).r > 190 && hex2rgb(fillColor.value).g > 190 && hex2rgb(fillColor.value).b > 190) {
          render.style.backgroundColor = "#273036";
        } else {
          render.style.backgroundColor = "transparent";
        }

      });

    });

    /* -------------- */

    /**
      * Fill Toggle
      */
    const fillToggle = document.getElementById("enableFill");
    const fillItemsWrapper = document.querySelector(".fillItemsWrapper");

    const checkFillToggle = () => {

      if (fillToggle.checked) {

        fillItemsWrapper.style.display = "flex";

        document.querySelector(".enableFill .checkboxWrapper").classList.add("active");

        previewSvg.setAttribute("fill", fillColor.value);


      } else {

        fillItemsWrapper.style.display = "none";

        document.querySelector(".enableFill .checkboxWrapper").classList.remove("active");

        previewSvg.setAttribute("fill", "transparent");

        render.style.backgroundColor = "transparent";

      }

    }

    // Init fill toggle
    checkFillToggle();

    // Handle fill toggle
    fillToggle.addEventListener("change", checkFillToggle);

    /* -------------- */

    /**
     * Stroke Toggle
     */
    const strokeToggle = document.getElementById("enableStroke");
    const strokeItemsWrapper = document.querySelector(".strokeItemsWrapper");

    // Check stroke toggle
    const checkStrokeToggle = () => {

      if (strokeToggle.checked) {

        strokeItemsWrapper.style.display = "flex";

        document.querySelector(".enableStroke .checkboxWrapper").classList.add("active");

        strokeWidth.value = 1;

        strokeWidthValue.innerText = strokeWidth.value;

        previewSvg.setAttribute("fill", fillColor.value);

        previewSvg.setAttribute("stroke", strokeColor.value);

        previewSvg.setAttribute("stroke-width", strokeWidth.value);


      } else {

        strokeItemsWrapper.style.display = "none";

        document.querySelector(".enableStroke .checkboxWrapper").classList.remove("active");

        previewSvg.setAttribute("fill", fillColor.value);

        previewSvg.removeAttribute("stroke");

        previewSvg.removeAttribute("stroke-width");

        render.style.backgroundColor = "transparent";

      }

    };

    // Check stroke Initial check
    checkStrokeToggle();

    // Handle stroke toggle
    strokeToggle.addEventListener("change", checkStrokeToggle);

    /* -------------- */

    /**
     * Stroke Color
     */
    const strokeColor = document.getElementById("strokeColor");
    const strokeColorValue = document.getElementById("strokeColorValue");

    strokeColor.addEventListener("input", () => {

      strokeColorValue.innerText = strokeColor.value;

      previewSvg.setAttribute("stroke", strokeColor.value);

      // If colour is light set the background to dark
      if (hex2rgb(strokeColor.value).r > 190 && hex2rgb(strokeColor.value).g > 190 && hex2rgb(strokeColor.value).b > 190) {
        render.style.backgroundColor = "#273036";
      } else {
        render.style.backgroundColor = "transparent";
      }


    });

    /* -------------- */

    /**
     * Stroke Width
     */
    const strokeWidth = document.getElementById("strokeWidth");
    const strokeWidthValue = document.getElementById("strokeWidthValue");

    strokeWidth.addEventListener("input", () => {

      strokeWidthValue.innerText = strokeWidth.value;

      previewSvg.setAttribute("stroke-width", strokeWidth.value);

    });

    /* -------------- */

    /**
     * Always have either Fill or Stroke Enabled
     * If both are disabled, enable Fill
     */

    const checkFillAndStroke = () => {

      if (!fillToggle.checked && !strokeToggle.checked) {

        fillToggle.checked = true;

        strokeToggle.checked = false;

        fillItemsWrapper.style.display = "flex";

        document.querySelector(".enableFill .checkboxWrapper").classList.add("active");

        previewSvg.setAttribute("fill", fillColor.value);

      }

    };

    // Check fill and stroke on load
    checkFillAndStroke();

    // Check fill and stroke on change
    fillToggle.addEventListener("change", checkFillAndStroke);
    strokeToggle.addEventListener("change", checkFillAndStroke);

    /* -------------- */

    /** 
     * Handle Preview Width & Height 
     */
    const prevWidth = document.getElementById("width");
    const prevWidthValue = document.getElementById("widthValue");
    const prevHeight = document.getElementById("height");
    const prevHeightValue = document.getElementById("heightValue");

    prevWidth.addEventListener("input", () => {

      prevWidthValue.innerText = `${prevWidth.value}px`;

      previewSvg.setAttribute("width", prevWidth.value);

      if (document.getElementById("preview").getAttribute("style") != null) {

        document.getElementById("preview").removeAttribute("style");

      }

    });

    prevHeight.addEventListener("input", () => {

      prevHeightValue.innerText = `${prevHeight.value}px`;

      previewSvg.setAttribute("height", prevHeight.value);

      if (document.getElementById("preview").getAttribute("style") != null) {

        document.getElementById("preview").removeAttribute("style");

      }


    });

    /* -------------- */

    /**
     * Handle Uploaded Width & Height
     */
    const initWidth = previewSvg.getAttribute("width");
    const initHeight = previewSvg.getAttribute("height");
    prevWidth.value = initWidth;
    prevWidthValue.innerText = `${width.value}px`;
    prevHeight.value = initHeight;
    prevHeightValue.innerText = `${height.value}px`;


    /**
     * Handle Zoom In & Out
     */
    const zoomIn = document.getElementById("zoomIn");
    const zoomOut = document.getElementById("zoomOut");
    const preview = document.getElementById("preview");

    let zoomLevel = 1;
    const zoomStep = 0.5;

    zoomIn.addEventListener("click", (e) => {
      e.preventDefault();
      zoomLevel += zoomStep;
      preview.style.transform = `scale(${zoomLevel})`;
    });

    zoomOut.addEventListener("click", (e) => {
      e.preventDefault();
      if (zoomLevel > 0.5) {
        zoomLevel -= zoomStep;
        preview.style.transform = `scale(${zoomLevel})`;
      }
    });


    /**
     * Copy to clipboard
     */
    const copyToClipBoard = () => {

      const copyButton = document.getElementById("toClipboard");

      copyButton.addEventListener("click", () => {

        const copyElement = previewSvg.outerHTML;

        navigator.clipboard.writeText(copyElement);

        alert("SVG copied to clipboard! 😊");

      });

    }

    // Init copy to clipboard
    copyToClipBoard();

    /**
     * Allow Download
     */
    const download = () => {

      const downloadButton = document.getElementById("download");

      downloadButton.addEventListener("click", () => {

        const svgContent = previewSvg.outerHTML;

        const blob = new Blob([svgContent], { type: "image/svg+xml" });

        const url = URL.createObjectURL(blob);

        // Replace the href with the blob URL
        downloadButton.setAttribute("href", url);
        downloadButton.setAttribute("download", "icon.svg");

        setTimeout(() => URL.revokeObjectURL(url), 1000);

      });

    };

    download();


  } /** end settings **/

  /**
   * Init Settings
   */

  settings();

  /* -------------- */

  /**
   * Handle SVG Uploads
   */

  const handleSVGUploads = () => {

    document.getElementById("fileInput").addEventListener("change", async (e) => {

      const file = e.target.files[0];

      const text = await file.text();

      sessionStorage.setItem("svgContent", text);

      document.getElementById("preview").innerHTML = text;

      if (file) {

        // Reset the preview
        settings();

        const previewSvg = document.getElementById("preview").querySelector("svg");
        const initWidth = previewSvg.getAttribute("width");
        const initHeight = previewSvg.getAttribute("height");
        const width = document.getElementById("width");
        const height = document.getElementById("height");
        const widthValue = document.getElementById("widthValue");
        const heightValue = document.getElementById("heightValue");

        // Set an initial value on width & height if it's null
        if (initWidth === null || initHeight === null) {

          previewSvg.setAttribute("width", "256");
          previewSvg.setAttribute("height", "256");
          width.value = 256;
          height.value = 256;
          widthValue.innerText = `${width.value}px`;
          heightValue.innerText = `${height.value}px`;

        }

        // Reset the colour to black
        previewSvg.setAttribute("fill", "#000000");

        // Cleaning function
        const cleanSvg = () => {

          if (previewSvg.getAttribute("id") != null) {

            previewSvg.removeAttribute("id");

          }

          if (previewSvg.getAttribute("class") != null) {

            previewSvg.removeAttribute("class");

          }

          if (previewSvg.getAttribute("style") != null) {

            previewSvg.removeAttribute("style");

          }

          if (previewSvg.getAttribute("xmlns") != null) {

            previewSvg.removeAttribute("xmlns");

          }

          if (previewSvg.getElementsByTagName("title").length > 0) {

            previewSvg.getElementsByTagName("title")[0].remove();

          }

          if (previewSvg.getElementsByTagName("defs").length > 0) {

            previewSvg.getElementsByTagName("defs")[0].remove();

          }


          // Iterate over the elements and remove the 
          // fill, stroke and style attributes.
          const svgElements = previewSvg.querySelectorAll('*');

          svgElements.forEach((element) => {

            element.removeAttribute("fill");
            element.removeAttribute("stroke");
            element.removeAttribute("style");

            if (element.getAttribute("class") === "cls-1") {

              element.remove();

            } else if (element.getAttribute("id") === "_Transparent_Rectangle_") {

              element.remove();

            } else if (element.getAttribute("fill") === "none" || element.getAttribute("fill") === "transparent") {

              element.remove();

            } else if (element.getAttribute("fill") === "transparent") {

              element.remove();

            }

          });

        }

        // Add a timeout to clean the SVG after the upload
        setTimeout(() => {

          cleanSvg();

        }, 100);

      } else {

        return;

      }

    });

  }

  handleSVGUploads();

  /* -------------- */
});