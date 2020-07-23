# UmbracoDev
A mishmash of all sorts of dev prototypes, design patterns and more. Idea behind this is that breaking these components into modular ones means that we can simply integrate them into future projects. Saves having to re-create things that are tedious or take alot of time to build from the ground up.

What's Included?
- [ ] eCommerce Base (WIP)
  - Custom Product Picker
  - Custom Section, to manage products, discounts etc.
- [ ] Forum Base (WIP)
  - Custom Section, to manage posts, categorie etc.
- [X] CacheHelper
  - CacheKeys, hooks into save & publish event by mapping to a set of CacheKeys that contain document types so that it knows exactly what content needs to be added, removed from their seperate caches.
- [X] Registration
  - Forgot Password, fully functionality password resets for members
  - Login
- [X] Responsive Image, Custom Umbraco datatype that makes the image cropper more functional.
  - Hooked up to the Media library instead of an Umbraco file upload when used inside of property editors.
  - Works in nested content
- [] Front End Editor (WIP), idea is if you're authenticated in the backoffice you'll have a popout window on the front end that will request all of the 'Editble By The Front End' properties, which means you can post the updated data to the API controller and update your content on the fly instead of logging into Umbraco.
- Various Generic Functionality, eases development with inheriting from these generic interfaces.
