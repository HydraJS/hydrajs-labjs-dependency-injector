(function (root, Hydra, und) {
  'use strict';
  /**
   * Create or get a namespace by a namespace defined as string
   * @param sNamespace
   * @returns {root|*}
   */
  function namespacing( sNamespace )
  {
    var oObj = root,
    aElements = sNamespace.split( '.' ),
    sElement;
    while( !!( sElement = aElements.shift() ) ) {
      oObj = oObj[sElement] !== und ? oObj[sElement] : oObj[sElement] = {};
    }
    return oObj;
  }
  Hydra.addAsyncMapping( 'sl_', {}, function ( sDependency ) {
    var oResolution = this[sDependency],
    oPromise = new Hydra.Promise();
    if(!oResolution){
      return false;
    }
    $LAB.script( oResolution.url).wait( function () {
      var oResolved = root[oResolution.exports];
      if(!oResolved){
        oResolved = namespacing(oResolution.exports);
      }
      oPromise.resolve( oResolved );
    });
    return oPromise;
  } );
}(this, Hydra));