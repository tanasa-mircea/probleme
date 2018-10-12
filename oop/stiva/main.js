QUnit.test('Stiva-Push', function( assert ) {
  var stiva = new Stiva(10);
  stiva.push('test');

  assert.deepEqual( stiva.elements, ['test'], "We expect to have a single string 'test' inside" );
});

QUnit.test('Stiva-Top', function( assert ) {
  var stiva = new Stiva(10);
  stiva.push('test');

  assert.deepEqual( stiva.top(), 'test', "We expect that the response is 'test'" );
});

QUnit.test('Stiva-Pop', function( assert ) {
  var stiva = new Stiva(10);
  stiva.push('test');
  var popedElement = stiva.pop();

  assert.deepEqual( popedElement, 'test', "We expect that the response is 'test'");
  assert.deepEqual( stiva.elements, [], "We expect that the elements vector is empty");
});

QUnit.test('Stiva-IsEmpty', function( assert ) {
  var stiva = new Stiva(10);
  assert.equal(stiva.isEmpty(), true, "We expect that on init the vector is empty");

  stiva.push('test');
  assert.equal(stiva.isEmpty(), false, "We expect that after push the vector is not empty");

  stiva.pop();
  assert.equal(stiva.isEmpty(), true, "We expect that after pop the vector is empty again");
});

QUnit.test('Stiva-IsFull', function( assert ) {
  var stiva = new Stiva(5);
  stiva.push(1);
  stiva.push(2);
  stiva.push(3);
  stiva.push(4);
  assert.equal(stiva.isFull(), false, "We expect that after 4 pushes the vector is not full");

  stiva.push(5);
  assert.equal(stiva.isFull(), true, "We expect that after 5 pushes the vector is full");

});

QUnit.test('Stiva-GetSize', function( assert ) {
  var stiva = new Stiva(10);

  assert.equal( stiva.getSize(), 0, "We expect that on init the vector's length is 0");

  stiva.push('test');
  assert.equal( stiva.getSize(), 1, "We expect that after push the vector's length is 1");

  stiva.pop();
  assert.equal( stiva.getSize(), 0, "We expect that after pop the vector's length is 0");
});

QUnit.test('Stiva-Clear', function( assert ) {
  var stiva = new Stiva(10);
  stiva.push('test');
  stiva.clear();

  assert.equal( stiva.getSize(), 0, "We expect that vector's length is 0");
});


