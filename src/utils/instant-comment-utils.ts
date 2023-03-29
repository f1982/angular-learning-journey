import PSPDFKit, { Comment, Instance, } from "pspdfkit";

function initInstantComments(instance: Instance) {
  const userAvatarTemplates = {};
  const commentAvatars = {};

  const creator = window.prompt(
    "Choose a user name for commenting. By setting the username to 'Admin' you can edit all the comments."
  );

  const _finalCreatorName =
    creator || `Anonymous_${Math.ceil(Math.random() * 10000)}`;

  instance.setAnnotationCreatorName(_finalCreatorName);

  instance.setIsEditableComment(
    (comment) =>
      (creator && creator.toLowerCase() === "admin") ||
      comment.creatorName === _finalCreatorName ||
      comment.pageIndex === null // always allow the user to add new comments
  );

  instance.setIsEditableAnnotation(
    (annotation) =>
      !(annotation instanceof PSPDFKit.Annotations.CommentMarkerAnnotation) ||
      annotation.creatorName === _finalCreatorName
  );

  instance.setCustomRenderers({
    CommentAvatar: ({ comment }) => {
    //@ts-ignore 
      let commentAvatar = commentAvatars[comment.id];

      // Cache avatars so that they are not recreated on every update.
      if (!commentAvatar) {
        //@ts-ignore 
        let userAvatarTemplate = userAvatarTemplates[comment.creatorName];

        // This is a template avatar image for a specific creatorName.
        // In a real world application you might want to cache by a userId.
        if (!userAvatarTemplate) {
          userAvatarTemplate = instance.contentDocument.createElement("img");
          userAvatarTemplate.src = "/static/avatar.png";
          //@ts-ignore 
          userAvatarTemplates[comment.creatorName] = userAvatarTemplate;
        }

        // Every comment needs its own image element even though the image
        // belongs to the same user - that's why we clone the template.
        commentAvatar = userAvatarTemplate.cloneNode();
        //@ts-ignore 
        commentAvatars[comment.id] = commentAvatar;
      }

      return {
        node: commentAvatar,
        append: false,
      };
    },
  });
}

export {
    initInstantComments
}