// src/app/app.component.ts

import { Component } from '@angular/core';
import PSPDFKit, {
  Annotation,
  InkAnnotation,
  Instance,
  Rect,
  ToolbarItem,
} from 'pspdfkit';

export const initialToolbarItems: ToolbarItem[] = [
  { type: 'sidebar-thumbnails' },
  { type: 'sidebar-bookmarks' },
  { type: 'comment' },
  { type: 'zoom-in' },
  { type: 'zoom-out' },
  { type: 'spacer' },
];

// import {
//   observeSignatureStorage,
//   restoreSavedSignatures,
// } from '../../utils/signature-storage-utils';
import './pkcs7';

@Component({
  selector: 'pspdfkit-basic',
  templateUrl: './pspdfkit-basic.component.html',
  styleUrls: ['pspdfkit-basic.component.sass'],
})
export class PspdfkitBasicComponent {
  title = 'PSPDFKit for Web Angular Example';

  currentSignatureField?: Annotation;

  ngAfterViewInit(): void {
    PSPDFKit.load({
      // Use the assets directory URL as a base URL. PSPDFKit will download its library assets from here.
      baseUrl: location.protocol + '//' + location.host + '/assets/',
      document: '/assets/example.pdf',
      container: '.pspdfkit-container',
      licenseKey: 'YOUR_LICENSE_KEY_GOES_HERE', // optional LICENSE key
      instant: true,
    }).then(async (instance) => {
      console.log('instance', instance);
      // For the sake of this demo, store the PSPDFKit for Web instance
      // on the global object so that you can open the dev tools and
      // play with the PSPDFKit API.

      (<any>window).instance = instance;
      // instance.setViewState(viewState => viewState.set("pagesRotation", 270))

      this.attachListeners(instance);
      // Load the saved signatures from local storage
      // restoreSavedSignatures(instance);

      // Test out the comment feature, but it's only can showcase on server mode
      // initInstantComments(instance);

      // Find specific text on the screen
      // const txtResult = await this.findText(instance, "PSPDFKit for Web");
      const txtResult = await this.findText(instance, 'Demo PDFs');
      console.log(
        'txtResult.get(0)?.rectsOnPage.get(0): ',
        txtResult.get(0)?.rectsOnPage.get(0)
      );
      console.log(
        'txtResult annotationRect: ',
        txtResult.get(0)?.annotationRect
      );
      console.log('txtResult isAnnotation: ', txtResult.get(0)?.isAnnotation);
      // txtResult.get(0)
      // Move the signature field to the text position
      const rect = txtResult.get(0)?.rectsOnPage.get(0);
      if (rect) {
        this.createSignatureField(
          instance,
          new PSPDFKit.Geometry.Rect({
            left: rect.left,
            top: rect.top,
            width: 250,
            height: 70,
          }),
          'user_signature_field'
        );
      }
    });
  }

  /**
   * Switch to signature view state
   *
   * @param instance
   */
  setInstanceSignatureViewState(instance: Instance) {
    instance.setViewState((viewState) =>
      viewState.set('interactionMode', PSPDFKit.InteractionMode.SIGNATURE)
    );
  }

  /**
   * attach listeners to PSPDFKit instance
   *
   * @param instance
   */
  attachListeners(instance: Instance) {
    //Observe annotation events
    this.observeAnnotation(instance);
    // Observe signature storage related events
    // observeSignatureStorage(instance);
  }

  observeAnnotation(instance: Instance) {
    instance.addEventListener('annotations.press', (event) => {
      console.log('annotations.press');
      // When press on a Signature annotation
      if (event.annotation instanceof PSPDFKit.Annotations.WidgetAnnotation) {
        this.currentSignatureField = event.annotation;
        console.log('currentSignatureField', this.currentSignatureField);
        //@ts-ignore
        event.preventDefault();
        // Switch to signature view state
        this.setInstanceSignatureViewState(instance);
      }
    });

    instance.addEventListener(
      'annotations.create',
      async (createdAnnotations) => {
        // const signatures = await instance.getSignaturesInfo();
        // console.log("signatures", signatures);
        const isDocumentSigned = await this.getDocumentSignedState(instance);
        if (isDocumentSigned) {
          // Bailing out since we just need to handle the scenario before a digital signature
          // has been placed.
          return;
        }

        const annotation = createdAnnotations.first();
        //Check created annotation is InkAnnotation and Signature
        if (
          annotation instanceof PSPDFKit.Annotations.InkAnnotation &&
          annotation.isSignature
        ) {
          // Move the signature to specific position
          if (this.currentSignatureField) {
            this.relocateSignature(
              instance,
              annotation,
              this.currentSignatureField?.boundingBox
            );
          }

          const [savedAnnotation] = await instance.ensureChangesSaved(
            annotation
          );
          console.log(
            'Saved Annotation ID:',
            (savedAnnotation as Annotation).id
          );

          const latestSignedState = await this.getDocumentSignedState(instance);
          console.log('latestSignedState', latestSignedState);

          //TODO: fix type issue
          //@ts-ignore
          // this.updateToolbarItems(createdAnnotations, true, instance);
        }
      }
    );
  }

  async updateToolbarItems(
    annotations: any[],
    disableFinishIfNoAnnotations: boolean,
    instance: Instance
  ) {
    const signatures = await instance.getSignaturesInfo();
    const { resetButton, saveButton, finishButton } = this.getButtons(instance);
    const hasSignatureAnnotation = annotations.some(
      (annotation) => annotation?.isSignature
    );
    // When the document is loaded and when a signature annotation is
    // created or deleted, we need to enable or disable the signing custom
    // toolbar item accordingly. The "disableFinishIfNoAnnotations" boolean
    // will determine which disable state we'll update the toolbar button with.
    const shouldDisableFinishBtn = disableFinishIfNoAnnotations
      ? !hasSignatureAnnotation
      : hasSignatureAnnotation;
    const additionalButtons =
      signatures.status === 'not_signed'
        ? [
            {
              type: 'signature',
              disabled: !shouldDisableFinishBtn,
            },
            {
              ...finishButton,
              disabled: shouldDisableFinishBtn,
            },
            saveButton,
          ]
        : [{ type: 'signature', disabled: true }, resetButton, saveButton];

    //TODO: fix type issue
    //@ts-ignore
    instance.setToolbarItems([...initialToolbarItems, ...additionalButtons]);
  }

  getButtons(instance: Instance) {
    return {
      saveButton: { type: 'custom', title: 'Save Signing' },
      finishButton: this.getFinishButton(instance),
      resetButton: this.getResetButton(),
    };
  }

  getFinishButton(instance: Instance) {
    return {
      type: 'custom',
      title: 'Finish Signing',
      className: 'finish-signing',
      name: 'sign',
      onPress: () => {
        this.signByServer(instance);
      },
    };
  }

  getResetButton() {
    return {
      type: 'custom',
      title: 'Reset',
      name: 'reset',
      async onPress() {
        localStorage.removeItem(
          'examples/digital-signatures-sign/lastUsedServerDocumentId'
        );
        location.href = '/digital-signatures-sign';
      },
    };
  }

  /**
   * Find specific text element
   *
   * @param instance
   * @param txt
   * @returns
   */
  public async findText(instance: Instance, txt: string) {
    return await instance.search(txt);
  }

  /**
   * Create a signature form field
   *
   * @param instance
   * @param rect
   * @param fieldName
   */
  createSignatureField(instance: Instance, rect: Rect, fieldName: string) {
    const widget = new PSPDFKit.Annotations.WidgetAnnotation({
      pageIndex: 0,
      boundingBox: rect,
      formFieldName: fieldName,
      id: PSPDFKit.generateInstantId(),
    });

    const formField = new PSPDFKit.FormFields.SignatureFormField({
      name: fieldName,
      annotationIds: PSPDFKit.Immutable.List([widget.id]),
    });
    instance.create([widget, formField]);
  }

  /**
   * Get a new fit size by the size of container
   * @param size
   * @param containerSize
   * @returns
   */
  fitIn(size: any, containerSize: any) {
    const { width, height } = size;
    const widthRatio = containerSize.width / width;
    const heightRatio = containerSize.height / height;
    const ratio = Math.min(widthRatio, heightRatio);
    return {
      width: width * ratio,
      height: height * ratio,
    };
  }

  /**
   * Move signature to specific position with specific size
   *
   * @param instance
   * @param annotation
   * @param rect
   */
  relocateSignature(instance: Instance, annotation: InkAnnotation, rect: Rect) {
    const newSize = this.fitIn(
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
        .set('boundingBox', newBoundingBox)
        .set('lines', newLines)
        .set('lineWidth', annotation.lineWidth * resizeRatio)
    );
  }

  /**
   * Digital sign the pdf by server
   * @param instance
   */
  async signByServer(instance: Instance) {
    try {
      await instance.signDocument(null, {
        // The example signing microservice we are using
        // expects the "user-1-with-rights" token when
        // invoking its endpoint. PSPDFKit Server forwards
        // any value specified in "signingToken" to it.
        signingToken: 'user-1-with-rights',
      });
      console.log('New signature added to the document!');
    } catch (error) {
      console.error(error);
    }
  }

  async getDocumentSignedState(instance: Instance) {
    const signatures = await instance.getSignaturesInfo();
    console.log('signatures', signatures);
    const isDocumentSigned = signatures.status !== 'not_signed';
    console.log('isDocumentSigned', isDocumentSigned);
    return isDocumentSigned;
  }
}
