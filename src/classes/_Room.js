export class _Room {
  constructor() {
    this.data = {
      renderableReferences: [],
      collisionableReferences: [],
      playerReference: [],
      updatableReferences: []
    }
  }
  // adding objects to room
  // args is array of possible object options
  // ['collisionable', 'renderable', 'player', 'grounded']
  addObjectReference(ObjectReference, args) {
    // error handling
    if (!ObjectReference) {
      throw ('ObjectReference does not exist')
      return ;
    }
    
    if (args.includes('collisionable')) this.data.collisionableReferences.push(ObjectReference)
    if (args.includes('updatable')) this.data.updatableReferences.push(ObjectReference)
    if (args.includes('renderable')) this.data.renderableReferences.push(ObjectReference)
    if (args.includes('player')) this.data.playerReference.push(ObjectReference)
  }
  update() {
    this.data.updatableReferences.map(obj => {
      obj.update()
    })
  }
  collisions() {
    const CR = this.data.collisionableReferences
    let standing = false
    for(let i = 0; i < CR.length; i++) {
      if(this.data.playerReference[0].collide(CR[i].data.hitbox) === 'up') {
        standing = true
      }
    }
    if(standing) this.data.playerReference[0].turnOnStanding()
    else this.data.playerReference[0].turnOffStanding()
  }
  render(ctx) {
    // cleaning up
    ctx.fillRect(0, 0, 1000, 400)

    // rendering every object's sprite
    this.data.renderableReferences.map(obj => {
      const {ImageReference, width, height, x, y} = obj.run(ctx)
      ctx.drawImage(ImageReference, x, y, width, height)
    })
  }
}