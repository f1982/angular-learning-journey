import PSPDFKit, {
  Annotation,
  ImageAnnotation,
  InkAnnotation,
  Instance,
} from "pspdfkit";

const STORAGE_KEY = "signatures_storage";
const ATTACHMENTS_KEY = "attachments_storage";

async function restoreSavedSignatures(instance: Instance) {
  const signaturesString = localStorage.getItem(STORAGE_KEY);
  if (!signaturesString) return;

  const storedSignatures = JSON.parse(signaturesString);
  // Construct annotations from serialized entries and call the `setStoredSignatures` API.
  const list = PSPDFKit.Immutable.List<InkAnnotation | ImageAnnotation>(
    storedSignatures.map(PSPDFKit.Annotations.fromSerializableObject)
  );

  instance.setStoredSignatures(list);

  // Retrieve attachments and add them to the instance.
  const attachmentsString = localStorage.getItem(ATTACHMENTS_KEY);
  if (attachmentsString) {
    const attachmentsArray = JSON.parse(attachmentsString);
    // Instantiate blob objects from the data URLs on local storage.
    const blobs = await Promise.all(
      attachmentsArray.map(({ url }: { url: string }) =>
        fetch(url).then((res) => res.blob())
      )
    );
    if (blobs) {
      // Create an attachment for each blob.
      blobs.forEach(async (b) => {
        await instance.createAttachment(b as Blob);
      });
    }
  }
}

function observeSignatureStorage(instance: Instance) {
  const fileToDataURL = (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener("error", reject);
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });

      if (file) return reader.readAsDataURL(file);
      throw new Error("no file supplied");
    });
  };

  instance.addEventListener("storedSignatures.create", async (annotation) => {
    console.log("storedSignatures.create. annotation", annotation);
    const signaturesString = localStorage.getItem(STORAGE_KEY);
    console.log("signaturesString", signaturesString);
    const storedSignatures = signaturesString
      ? JSON.parse(signaturesString)
      : [];

    const serializedAnnotation =
      PSPDFKit.Annotations.toSerializableObject(annotation);
    console.log("serializedAnnotation", serializedAnnotation);
    if (annotation.imageAttachmentId) {
      const attachment = await instance.getAttachment(
        annotation.imageAttachmentId
      );

      // Create the data URL and add it to local storage.
      // Note: This is done only for demonstration purposes.
      // Storing potentially large chunks of data using local storage is
      // considered bad practice due to the synchronous nature of the API.
      // For production applications, please consider alternatives such as
      // dedicated backend storage or IndexedDB.
      const url = await fileToDataURL(attachment);
      console.log("url", url);
      const attachmentsString = localStorage.getItem(ATTACHMENTS_KEY);
      const attachmentsArray = attachmentsString
        ? JSON.parse(attachmentsString)
        : [];
      attachmentsArray.push({ url, id: annotation.imageAttachmentId });
      // Separate the `localStorage` item to store attachments.
      localStorage.setItem(ATTACHMENTS_KEY, JSON.stringify(attachmentsArray));
    }
    storedSignatures.push(serializedAnnotation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedSignatures));
    // Add a new annotation so that it renders as part of the UI on the current session.
    instance.setStoredSignatures((signatures) => signatures.push(annotation));
  });

  //delete store signature
  instance.addEventListener("storedSignatures.delete", (annotation) => {
    const signaturesString = localStorage.getItem(STORAGE_KEY);
    const storedSignatures = signaturesString
      ? JSON.parse(signaturesString)
      : [];
    const annotations = storedSignatures.map(
      PSPDFKit.Annotations.fromSerializableObject
    );
    const updatedAnnotations = annotations.filter(
      (currentAnnotation: any) => !currentAnnotation.equals(annotation)
    );
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        updatedAnnotations.map(PSPDFKit.Annotations.toSerializableObject)
      )
    );
    // Use the `setStoredSignatures` API so that the current UI is properly updated.
    instance.setStoredSignatures((signatures) =>
      signatures.filter((signature) => !signature.equals(annotation))
    );

    if (annotation.imageAttachmentId) {
      // Remove the attachment from the array.
      const attachmentsString = localStorage.getItem(ATTACHMENTS_KEY);
      if (attachmentsString) {
        let attachmentsArray = JSON.parse(attachmentsString);
        attachmentsArray = attachmentsArray.filter(
          (attachment: any) => attachment.id !== annotation.imageAttachmentId
        );
        localStorage.setItem(ATTACHMENTS_KEY, JSON.stringify(attachmentsArray));
      }
    }
  });
}

export { restoreSavedSignatures, observeSignatureStorage };
