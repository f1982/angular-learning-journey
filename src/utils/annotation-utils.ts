import PSPDFKit, {
  Annotation,
  InkAnnotation,
  Instance,
  Rect,
  WidgetAnnotation,
} from "pspdfkit";

let currentSignatureField: WidgetAnnotation;

function observeAnnotation(instance: Instance) {
  instance.addEventListener("annotations.press", (event) => {
    console.log("annotations.press");
    // When press on a Signature annotation
    if (event.annotation instanceof PSPDFKit.Annotations.WidgetAnnotation) {
      currentSignatureField = event.annotation;
      console.log("currentSignatureField", currentSignatureField);
      //@ts-ignore
      event.preventDefault();
      // Switch to signature view state
      // this.setInstanceSignatureViewState(instance);
    }
  });

  instance.addEventListener(
    "annotations.create",
    async (createdAnnotations) => {
      // const signatures = await instance.getSignaturesInfo();
      // console.log("signatures", signatures);
      // const isDocumentSigned = await this.getDocumentSignedState(instance);
      // if (isDocumentSigned) {
      //   // Bailing out since we just need to handle the scenario before a digital signature
      //   // has been placed.
      //   return;
      // }

      const annotation = createdAnnotations.first();
      //Check created annotation is InkAnnotation and Signature
      if (
        annotation instanceof PSPDFKit.Annotations.InkAnnotation &&
        annotation.isSignature
      ) {
        // Move the signature to specific position
        if (currentSignatureField) {
          // this.relocateSignature(
          //   instance,
          //   annotation,
          //   currentSignatureField?.boundingBox
          // );
        }

        const [savedAnnotation] = await instance.ensureChangesSaved(annotation);
        console.log("Saved Annotation ID:", (savedAnnotation as Annotation).id);

        //   const latestSignedState = await this.getDocumentSignedState(instance);
        //   console.log("latestSignedState", latestSignedState);

        //TODO: fix type issue
        //@ts-ignore
        // this.updateToolbarItems(createdAnnotations, true, instance);
      }
    }
  );
}

/**
 * Move signature to specific position with specific size
 *
 * @param instance
 * @param annotation
 * @param rect
 */
function relocateSignature(
  instance: Instance,
  annotation: InkAnnotation,
  rect: Rect
) {
  const newSize = fitIn(
    {
      width: annotation.boundingBox.width,
      height: annotation.boundingBox.height,
    },
    {
      width: rect.width,
      height: rect.height,
    }
  );
  const resizeRatio = newSize.width / annotation.boundingBox.width;
  const newLeft = rect.left + rect.width / 2 - newSize.width / 2;
  const newTop = rect.top + rect.height / 2 - newSize.height / 2;

  // Resize the Ink signature lines
  const newLines = annotation.lines.map((line) => {
    return line.map((point) => {
      return new PSPDFKit.Geometry.DrawingPoint({
        x: newLeft + (point.x - annotation.boundingBox.left) * resizeRatio,
        y: newTop + (point.y - annotation.boundingBox.top) * resizeRatio,
      });
    });
  });

  const newBoundingBox = new PSPDFKit.Geometry.Rect({
    left: newLeft,
    top: newTop,
    width: newSize.width,
    height: newSize.height,
  });

  instance.update(
    annotation
      //@ts-ignore
      .set("boundingBox", newBoundingBox)
      .set("lines", newLines)
      .set("lineWidth", annotation.lineWidth * resizeRatio)
  );
}

/**
 * Get a new fit size by the size of container
 * @param size
 * @param containerSize
 * @returns
 */
function fitIn(size: any, containerSize: any) {
  const { width, height } = size;
  const widthRatio = containerSize.width / width;
  const heightRatio = containerSize.height / height;
  const ratio = Math.min(widthRatio, heightRatio);
  return {
    width: width * ratio,
    height: height * ratio,
  };
}

export { observeAnnotation };
