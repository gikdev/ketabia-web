/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3632866850",
    "max": 5,
    "min": 0,
    "name": "rating",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // remove field
  collection.fields.removeById("number3632866850")

  return app.save(collection)
})
