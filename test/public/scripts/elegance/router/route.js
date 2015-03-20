(function() {
  Elegance.Router.Route = (function() {
    function Route(app, name, path1, target) {
      var clazz;
      this.app = app;
      this.name = name;
      this.path = path1;
      this.target = target != null ? target : null;
      this.path = this.path.replace(/^\/{2,/, '');
      this.path = this.path.replace(/\/{2,$/, '');
      if (this.path === '') {
        this.path = '/';
      }
      this.segments = this.path.split('/');
      if (this.target === null) {
        clazz = Elegance.utils.capitalize(this.name) + "Controller";
        if (window[clazz] != null) {
          this.target = new window[clazz](this.app, this);
        } else {
          this.target = new Elegance.Controller(this.app, this);
        }
      }
    }

    Route.prototype.matches = function(test) {
      var i, index, len, ref, segment;
      if (test === this.path) {
        return true;
      }
      test = test.split('/');
      if (test.length > this.segments.length) {
        return false;
      }
      index = 0;
      ref = this.segments;
      for (i = 0, len = ref.length; i < len; i++) {
        segment = ref[i];
        if (/^:.+\?/.test(segment)) {
          index++;
          continue;
        } else if (/^:.+/.test(segment)) {
          if (test[index] != null) {
            index++;
            continue;
          } else {
            return false;
          }
        } else if (test[index] === segment) {
          index++;
          continue;
        } else {
          return false;
        }
      }
      return true;
    };

    Route.prototype.extractParameters = function(request) {
      var i, index, len, parameters, path, ref, segment;
      path = request.split('/');
      index = 0;
      parameters = [];
      ref = this.segments;
      for (i = 0, len = ref.length; i < len; i++) {
        segment = ref[i];
        if (/^:/.test(segment)) {
          if (path[index] != null) {
            parameters.push(path[index]);
          }
        }
        index++;
      }
      return parameters;
    };

    return Route;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,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QUFBLElBQUEsR0FBTyxPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsQ0FBUCxDQUFBO0FBQUEsTUFHQSxLQUFBLEdBQVEsQ0FIUixDQUFBO0FBQUEsTUFJQSxVQUFBLEdBQWEsRUFKYixDQUFBO0FBS0E7QUFBQSxXQUFBLHFDQUFBO3lCQUFBO0FBQ0MsUUFBQSxJQUFHLElBQUksQ0FBQyxJQUFMLENBQVUsT0FBVixDQUFIO0FBQ0MsVUFBQSxJQUFHLG1CQUFIO0FBQ0MsWUFBQSxVQUFVLENBQUMsSUFBWCxDQUFnQixJQUFLLENBQUEsS0FBQSxDQUFyQixDQUFBLENBREQ7V0FERDtTQUFBO0FBQUEsUUFHQSxLQUFBLEVBSEEsQ0FERDtBQUFBLE9BTEE7QUFXQSxhQUFPLFVBQVAsQ0Faa0I7SUFBQSxDQW5EbkIsQ0FBQTs7aUJBQUE7O01BREQsQ0FBQTtBQUFBIiwiZmlsZSI6InJvdXRlci9yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEVsZWdhbmNlLlJvdXRlci5Sb3V0ZVxyXG5cdGNvbnN0cnVjdG9yOiAoQGFwcCwgQG5hbWUsIEBwYXRoLCBAdGFyZ2V0ID0gbnVsbCkgLT5cclxuXHRcdCMgc2FuaXRpemUgcGF0aFxyXG5cdFx0QHBhdGggPSBAcGF0aC5yZXBsYWNlIC9eXFwvezIsLywgJydcclxuXHRcdEBwYXRoID0gQHBhdGgucmVwbGFjZSAvXFwvezIsJC8sICcnXHJcblx0XHRAcGF0aCA9ICcvJyBpZiBAcGF0aCBpcyAnJ1xyXG5cclxuXHRcdEBzZWdtZW50cyA9IEBwYXRoLnNwbGl0ICcvJ1xyXG5cclxuXHRcdCMgY3JlYXRlIGNvbnRyb2xsZXJcclxuXHRcdGlmIEB0YXJnZXQgaXMgbnVsbFxyXG5cdFx0XHRjbGF6eiA9IEVsZWdhbmNlLnV0aWxzLmNhcGl0YWxpemUoQG5hbWUpICsgXCJDb250cm9sbGVyXCJcclxuXHRcdFx0aWYgd2luZG93W2NsYXp6XT9cclxuXHRcdFx0XHRAdGFyZ2V0ID0gbmV3IHdpbmRvd1tjbGF6el0oQGFwcCwgQClcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdEB0YXJnZXQgPSBuZXcgRWxlZ2FuY2UuQ29udHJvbGxlcihAYXBwLCBAKVxyXG5cclxuXHJcblx0bWF0Y2hlczogKHRlc3QpIC0+XHJcblx0XHQjIGFyZSB0aGV5IGVxdWFsP1xyXG5cdFx0aWYgdGVzdCA9PSBAcGF0aFxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cclxuXHRcdHRlc3QgPSB0ZXN0LnNwbGl0ICcvJ1xyXG5cclxuXHRcdCMgaXMgdGVzdCBsb25nZXIgdGhhbiB0aGUgcGF0aD9cclxuXHRcdGlmIHRlc3QubGVuZ3RoID4gQHNlZ21lbnRzLmxlbmd0aFxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHJcblx0XHQjIG9rLCBsZXQncyB0ZXN0IGVhY2ggc2VnbWVudCBpbiBvcmRlclxyXG5cdFx0aW5kZXggPSAwXHJcblx0XHRmb3Igc2VnbWVudCBpbiBAc2VnbWVudHNcclxuXHRcdFx0IyBpcyB0aGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50P1xyXG5cdFx0XHRpZiAvXjouK1xcPy8udGVzdCBzZWdtZW50XHJcblx0XHRcdFx0XHRpbmRleCsrXHJcblx0XHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHQjIGlzIGl0IGEgcmVxdWlyZWQgYXJndW1lbnQ/XHJcblx0XHRcdGVsc2UgaWYgL146LisvLnRlc3Qgc2VnbWVudFxyXG5cdFx0XHRcdCMgZG9lcyBpdCBleGlzdD9cclxuXHRcdFx0XHRpZiB0ZXN0W2luZGV4XT9cclxuXHRcdFx0XHRcdGluZGV4KytcclxuXHRcdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdFx0ZWxzZSByZXR1cm4gZmFsc2VcclxuXHJcblx0XHRcdCMgaXQncyBhIGxpdGVyYWwgc2VnbWVudCwgdGhleSBnb3R0YSBtYXRjaFxyXG5cdFx0XHRlbHNlIGlmIHRlc3RbaW5kZXhdID09IHNlZ21lbnRcclxuXHRcdFx0XHRpbmRleCsrXHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0ZWxzZSByZXR1cm4gZmFsc2VcclxuXHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cclxuXHRleHRyYWN0UGFyYW1ldGVyczogKHJlcXVlc3QpIC0+XHJcblx0XHRwYXRoID0gcmVxdWVzdC5zcGxpdCAnLydcclxuXHJcblx0XHQjIGV4dHJhY3QgcGFyYW1ldGVycyBmcm9tIHRoZSByZXF1ZXN0XHJcblx0XHRpbmRleCA9IDBcclxuXHRcdHBhcmFtZXRlcnMgPSBbXVxyXG5cdFx0Zm9yIHNlZ21lbnQgaW4gQHNlZ21lbnRzXHJcblx0XHRcdGlmIC9eOi8udGVzdCBzZWdtZW50XHJcblx0XHRcdFx0aWYgcGF0aFtpbmRleF0/XHJcblx0XHRcdFx0XHRwYXJhbWV0ZXJzLnB1c2ggcGF0aFtpbmRleF1cclxuXHRcdFx0aW5kZXgrK1xyXG5cclxuXHRcdHJldHVybiBwYXJhbWV0ZXJzIl19