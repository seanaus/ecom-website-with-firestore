<div class="burger-container" onClick="toggleNavPills()">
  <div class="burger">
    <div class="burger-line burger-line-top"></div>
    <div class="burger-line burger-line-middle"></div>
    <div class="burger-line burger-line-bottom"></div>
  </div>
</div>
<div class="navBar" id="navBar">
  <% navbar.items.forEach(link => { %>
    <a class="navPill navLink <%= link.visible =='true' ? 'showMenuButton' : link.visible =='onAuth' && user.id != -1 ? 'showMenuButton' : link.visible =='!onAuth' && user.id == -1 ? 'showMenuButton' : 'hideMenuButton' %>" href="<%= link.route %>">
      <div class="material-icons icon"><%= link.matIcon %></div>
      <div class="iconLabel"><%= link.caption %></div>
      <% if(link.caption == 'Cart') { %>
        <div id="cartCounter" class="cartCounter"></div>
      <% } %>
    </a>
  <% }) %>
</div>
<script>
  const settings = {
    id: "<%= settings.id %>",
    projectName: "<%= settings.projectName %>",
    profitMetricPercentage: "<%= settings.profitMetricPercentage %>",
    pageWidthMaxPercentage: "<%= settings.pageWidthMaxPercentage %>",
  };
  const auth = {
    id: "<%= user.id %>",
    forename: "<%= user.forename %>",
    surname: "<%= user.surname %>",
    email: "<%= user.email %>",
    token: "<%= user.token %>",
  };
  // Save projectSettings and auth info to BROWSER's local storage
  // So that the data is available for the dynamic javascript code
  localStorage.setItem("settings", JSON.stringify(settings));
  localStorage.setItem("auth", JSON.stringify(auth));
  // If different user logs in on same machine remove the cached cart
  // Data from the previous user
  const cartCache = JSON.parse(localStorage.getItem("cart"));
  if (cartCache) {
    if (cartCache.userId !== "<%= user.id %>") {
      localStorage.removeItem("cart");
    }
  }

</script>