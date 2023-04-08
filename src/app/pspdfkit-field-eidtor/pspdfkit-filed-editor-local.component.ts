import { Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import PSPDFKit, { Annotation, Instance } from "pspdfkit";
import { MockSigneeList, SignerDataItem, pspdfkitConfig } from "./mock-data";

const signatureFieldPrefix = "signatureField_";

@Component({
  selector: "pspdfkit-filed-editor-local.component",
  templateUrl: "./pspdfkit-filed-editor-local.component.html",
  styleUrls: ["pspdfkit-filed-editor-local.component.css"],
})
export class PSPDFKitEditorLocalComponent {
  @ViewChild("selectSignee") selectSignee: ElementRef | null = null;
  @ViewChild("addFieldButton") addFieldButton: ElementRef | null = null;
  selectedSigneeId?: string;
  selectedSignerData?: SignerDataItem;

  pdfInstance: Instance | null = null;
  currentPageIndex: number = 0;

  signerList = MockSigneeList;

  signerFieldOnPdf: boolean = false;

  constructor(private route: ActivatedRoute) {}

  // Note: The parameter name in the route should match the parameter name used in the component. In this case, the parameter name should be "selectedSigneeId".
  // Signer fields records
  fieldRecords: Record<
    string,
    {
      x: number;
      y: number;
      width: number;
      height: number;
      pageIndex: number;
      signer: SignerDataItem;
    }
  > = {};

  ngAfterViewInit(): void {
    this.selectedSigneeId = this.signerList[0].id;
    this.selectedSignerData = this.signerList[0];

    this.loadPDF();
  }

  loadPDF() {
    PSPDFKit.load({
      baseUrl: location.protocol + "//" + location.host + "/assets/",
      document: "example.pdf",
      licenseKey: pspdfkitConfig.licenseKey,
      container: ".pspdfkit-container",
      instant: true,
      initialViewState: new PSPDFKit.ViewState({
        sidebarMode: PSPDFKit.SidebarMode.THUMBNAILS,
        formDesignMode: true, //User cannot edit the property of the field, but still can move and resize the field
      }),
      customRenderers: this.getCustomRenderers(),
    }).then(async (instance: any) => {
      this.pdfInstance = instance;
      // For the sake of this demo, store the PSPDFKit for Web instance
      (<any>window).instance = instance;

      instance.setToolbarItems([
        { type: "sidebar-thumbnails" },
        { type: "pager" },
        { type: "pan" },
        { type: "zoom-in" },
        { type: "zoom-out" },
        { type: "zoom-mode" },
        { type: "spacer" },
      ]);

      // Move the thumbnail sidebar to right
      instance.setViewState((viewState: any) =>
        viewState.set("sidebarPlacement", PSPDFKit.SidebarPlacement.END)
      );

      this.setupCustomUI();
      this.observeAnnotation(instance);
      instance.addEventListener(
        "viewState.currentPageIndex.change",
        (pageIndex: number) => {
          this.currentPageIndex = pageIndex;
        }
      );

      await this.updateSidebarUI();
    });
  }

  async onChange() {
    const signerId = this.selectSignee?.nativeElement?.value;
    this.selectedSigneeId = signerId;
    this.selectedSignerData = this.signerList.find(
      (item) => item.id === signerId
    );

    await this.updateSidebarUI();
  }

  async updateSidebarUI() {
    if (!this.selectedSignerData) return;
    const selectedSigner = this.selectedSignerData;

    // Reset add button
    this.addFieldButton?.nativeElement.removeAttribute("disabled");

    // Update button color
    this.addFieldButton?.nativeElement.setAttribute(
      "style",
      `background-color:${selectedSigner.color}`
    );

    // Update button if find selected signer has fields on pdf
    const fields = await this.findSigningFields();

    // Disable the add button if find it's already there
    if (
      fields?.find(
        (field) =>
          field.customData &&
          field.customData["name"] === this.selectedSignerData?.name
      )
    ) {
      this.addFieldButton?.nativeElement.setAttribute("disabled", "true");
    }
  }

  async addSignatureField() {
    if (!this.pdfInstance) return;

    // Default signature field position of current page
    const rect = new PSPDFKit.Geometry.Rect({
      left: 300,
      top: 200,
      width: 250,
      height: 70,
    });

    // Define a filedName
    const fieldName = signatureFieldPrefix + this.selectedSigneeId;

    const widget = new PSPDFKit.Annotations.WidgetAnnotation({
      pageIndex: this.currentPageIndex,
      boundingBox: rect,
      formFieldName: signatureFieldPrefix + this.selectedSigneeId,
      id: PSPDFKit.generateInstantId(),
      //Add signer data as custom data with signing field
      customData: { ...this.selectedSignerData },
    });

    const formField = new PSPDFKit.FormFields.SignatureFormField({
      name: fieldName,
      annotationIds: PSPDFKit.Immutable.List([widget.id]),
    });

    this.pdfInstance.create([widget, formField]);

    //Record the widget
    this.fieldRecords[this.selectedSigneeId!] = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      pageIndex: this.currentPageIndex,
      signer: this.selectedSignerData!,
    };

    await this.updateSidebarUI();
  }

  async saveAndMoveToNext() {
    const idsNotBeenPlaced = await this.findSignerNotBeenPlaced(
      this.signerList.map((signer) => signer.id)
    );
    if (idsNotBeenPlaced && idsNotBeenPlaced?.length < 1) {
      alert("save and move to next");
    } else {
      const missingUsers = this.signerList
        .filter((signer) => idsNotBeenPlaced?.includes(signer.id))
        .map((signer) => signer.name)
        .join(",");

      alert(
        "Please check if you have already add all the signee fields. \n Missing: " +
          missingUsers
      );
    }
  }

  observeAnnotation(instance: Instance) {
    instance.addEventListener("annotations.press", (event) => {});

    instance.addEventListener("annotations.create", async (annotations) => {});

    instance.addEventListener("annotations.transform", async (event) => {
      // console.log("annotations.transform: ", event.annotation.toJS());
    });

    instance.addEventListener("annotations.delete", async (annotations) => {
      annotations.forEach((deletedAnnotation) => {});
    });
  }

  async findSignerNotBeenPlaced(userIds: string[]) {
    if (!this.pdfInstance) return;

    const names: any[] = [];
    // Iterate all pages
    for (let index = 0; index < this.pdfInstance.totalPageCount; index++) {
      const annotations = await this.pdfInstance?.getAnnotations(index);
      names.push(
        ...annotations
          .filter((annotation) => annotation && annotation["formFieldName"])
          .map((annotation) => annotation["formFieldName"].split("_")[1])
      );
    }
    return userIds.filter((id) => !names.includes(id));
  }

  async findSigningFields() {
    if (!this.pdfInstance) return;
    const fields = [];
    // Iterate all pages
    for (let index = 0; index < this.pdfInstance.totalPageCount; index++) {
      const annotations = await this.pdfInstance?.getAnnotations(index);
      fields.push(
        ...annotations.filter(
          (annotation) => annotation["formFieldName"] //add more filter
        )
      );
    }
    return fields;
  }

  getCustomRenderers() {
    return {
      Annotation: ({ annotation }: { annotation: Annotation }) => {
        if (!this.pdfInstance) return null;
        if (
          annotation instanceof PSPDFKit.Annotations.WidgetAnnotation ===
          false
        )
          return null;

        // const customData = annotation.get<SignerDataItem>("customData");
        const customData = annotation.customData;
        if (!customData) return null;

        const node = this.pdfInstance.contentDocument.createElement("div");
        node.style.position = "absolute";
        node.style.bottom = "-28px";
        node.style.padding = "2px";
        node.style.fontSize = "12px";
        node.style.backgroundColor = customData["color"] as string;
        node.style.border = "1px solid white";
        // node.style.color = customData["color"] as string;
        node.innerHTML = ((customData["role"] as string) +
          "," +
          customData["name"]) as string;

        return {
          node,
          append: true,
        };
      },
    };
  }

  setupCustomUI() {
    if (!this.pdfInstance) return;

    const records = this.fieldRecords;
    this.pdfInstance.setCustomUIConfiguration((customUiConfiguration) => ({
      ...customUiConfiguration,
      [PSPDFKit.UIElement.Sidebar]: {
        [PSPDFKit.SidebarMode.THUMBNAILS]({ containerNode }) {
          const thumbnailImages = (
            containerNode as HTMLElement
          ).querySelectorAll(".PSPDFKit-Sidebar-Thumbnails-Page-Image");

          for (const key in records) {
            const item = records[key];

            // Add red border to the thumbnail if there're signature field in the page
            if (thumbnailImages[item.pageIndex]) {
              const thumbnailEl = thumbnailImages[
                item.pageIndex
              ] as HTMLElement;
              thumbnailEl.setAttribute("style", "border: 2px solid red");
            }
          }
          return {
            node: containerNode,
          };
        },
      },
    }));
  }
}
