// Import the 'figma' library and show the UI
figma.showUI(__html__);

// Define the 'onmessage' event handler for receiving messages from the UI
figma.ui.onmessage = async msg => {
  const lines = msg.file.split('\r\n');
  const dataString = lines.slice(1); // Skip the first line (header)

  const students = [];

  for (let i = 0; i < dataString.length; i++) {
    const values = dataString[i].split(',');
    const studentObj = {};
    studentObj["data1"] = values[0];
    studentObj["data2"] = parseFloat(values[1]); // Parse the data as a number
    students.push(studentObj);
  }

  if (msg.type === 'fileUpload') {
    const sample_arr = students;
    const colors=[{ r: 1, g: 0, b: 0 },{ r: 0, g: 1, b: 0 },{ r: 0, g: 0, b: 1 }]
    const nodes = [];
    const rectWidth = 100;
    const spacing = 20;
    const graphBottomY = figma.viewport.center.y;

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    for (let i = 0; i < sample_arr.length; i++) {
      const rect = figma.createRectangle();
      rect.x = i * (rectWidth + spacing);
      const barHeight = sample_arr[i].data2;
      rect.y = graphBottomY - barHeight;
      rect.resize(rectWidth, barHeight);
      rect.fills = [{ type: 'SOLID', color: colors[i%3] }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);

      const label = figma.createText();
      label.characters = sample_arr[i].data1;
      label.x = rect.x + rectWidth / 2 - label.width / 2;
      label.y = graphBottomY + 10;
      figma.currentPage.appendChild(label);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Close the plugin after execution
  figma.closePlugin();
};
