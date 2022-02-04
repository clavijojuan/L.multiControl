L.Control.multiControl = L.Control.extend({
    options: {
        position: 'topright',
        label: 'Layer Control'
    },

    initialize: function(overlays, options){
        this.overlays = overlays;
        L.Util.setOptions(this, options);
    },

    onAdd: function (map){
        this._map = map
        const container = this._container = this.createStructure();
        if(!this.overlays) this.toggle();
        return container;
    },

    createStructure: function(){
        const container = L.DomUtil.create('div', 'leaflet-controllable-legend');
        const collapseIcon = L.DomUtil.create('div', 'fas collapse hidden');
        collapseIcon.addEventListener('click', () => this.toggle());

        const head = this.createHead();
        const body = this.createBody();

        container.append(collapseIcon);
        container.append(head);
        container.append(body);

        L.DomEvent.disableClickPropagation(container);

        return container
    },

    createBody: function(){
        const body = L.DomUtil.create('div', 'leaflet-controllable-legend-body');
        const overlaysContainer = L.DomUtil.create('div');
        body.append(overlaysContainer);

        if(this.overlays && this.overlays.length > 0){
            this.overlays.forEach((overlay, i)=>{
                const div = this.createChild(overlay, i);
                overlaysContainer.append(div);
            });
        }
        
        return body
    },

    createHead() {
        const head = L.DomUtil.create('div', 'leaflet-controllable-legend-head');
        const left = L.DomUtil.create('div', 'left');
        const right = L.DomUtil.create('div', 'right');

        left.innerHTML = `
            <i class="fas fa-layer-group mr-2"></i> 
            <div>${this.options.label}</div>
        `

        const toggle = L.DomUtil.create('button', 'btn fas fa-compress');
        const close = L.DomUtil.create('button', 'btn fas fa-times');
        close.addEventListener('click', () => this._map.removeControl(this._container));
        toggle.addEventListener('click', (e) => {
            this.toggle();
            e.stopPropagation();
        });

        right.append(toggle);
        right.append(close);

        head.append(left);
        head.append(right);

        return head
    },
    
    toggleLayer(e, layer){
        if(e.target.checked){
            layer.addTo(this._map)
        }
        else {
            this._map.removeLayer(layer)
        }
    },

    createChild(overlay, i){

        this.validateNames();

        const elements = this.defineLayerElements(overlay.layer),
              div = L.DomUtil.create('div', 'child-container'),
              childOverlay = L.DomUtil.create('div', 'childOverlay'),
              left = L.DomUtil.create('div', 'left'),
              right = L.DomUtil.create('div', 'right'),
              caret = L.DomUtil.create('i', 'fas fa-caret-right'),
              check = L.DomUtil.create('input', 'switch'),
              zoom  = L.DomUtil.create('button', 'btn fas fa-crosshairs'),
              close  = L.DomUtil.create('button', 'btn fas fa-times'),
              inputsContainer = L.DomUtil.create('div', 'inputsContainer hidden')

        check.setAttribute('type', 'checkbox');
        check.setAttribute('id', `${overlay.name+i}`);
        
        const label = L.DomUtil.create('label');
        label.setAttribute("for", `${overlay.name+i}`);
        label.innerText = overlay.name;

        const legend = L.DomUtil.create('div', 'hidden');

        check.addEventListener('click', (e) => {
            this.toggleLayer(e, overlay.layer);
            caret.classList.toggle('fa-caret-right');
            caret.classList.toggle('fa-caret-down');
            inputsContainer.classList.toggle('hidden');
            legend.classList.toggle('hidden');
            e.stopPropagation();
        });

        if(overlay.layer?._map) check.click();

        label.addEventListener('click', e => e.stopPropagation());

        close.addEventListener('click', (e) => {
            this._map.removeLayer(overlay.layer);
            div.remove();
            this.overlays.splice(this.findIndexByName(overlay.name), 1)
            this.evalLength();
            e.stopPropagation();
        })

        zoom.addEventListener('click', (e) => {
            elements.zoom();
            e.stopPropagation();
        })

        childOverlay.addEventListener('click', e => check.click());

        left.append(caret)
        left.append(check)
        left.append(label)
        right.append(zoom)
        right.append(close)

        childOverlay.append(left)
        childOverlay.append(right)


        div.append(childOverlay);

        const inputsContainerLeft = L.DomUtil.create('div', 'left');
        const inputsContainerRight = L.DomUtil.create('div', 'right');

        inputsContainer.append(inputsContainerLeft);
        inputsContainer.append(inputsContainerRight);
        div.append(inputsContainer);

        if(elements.opacity){
            const range = L.DomUtil.create('input');
            range.type = 'range';
            range.min = 0;
            range.max = 1;
            range.step = 0.1;
            range.value = elements.opacity.value;
            range.addEventListener('input', (e) => elements.opacity.func(e.target.value));
            inputsContainerLeft.append(range);
        }

        if(elements.color && elements.legend){

            const color = document.createElement('input');
            color.type = 'color';
            color.value = elements.color.value();

            div.append(legend);

            let legendContainer;
            if(overlay.layer.options.style){
                const groups = overlay.layer.getLayers().map((sublayer)=>{
                    return {
                        color: sublayer.options.color, 
                        elemName: sublayer.options.legendLabel || overlay.name
                    }
                });

                let uniques = [...new Map(groups.map((item) => [item["color"], item])).values()];

                legendContainer = this.createLegend(uniques);
                legend.append(legendContainer);

            } 
            else {
                const obj = {
                    elemName: overlay.name, 
                    color: elements.color.value()
                };
                legendContainer = this.createLegend([obj]);
                
                legend.append(legendContainer);
                inputsContainerLeft.prepend(color);
            }

            color.addEventListener('input', (e) => {
                elements.color.func(e.target.value);
                legendContainer.firstChild.firstChild.style.backgroundColor = e.target.value
            });
        }

        if(elements.bringToFront){
            const front = L.DomUtil.create('button', 'btn fas fa-arrow-up');
            front.setAttribute('type', 'button');
            front.addEventListener('click', (e) => elements.bringToFront());
            inputsContainerRight.append(front);
        }

        if(elements.bringToBack){
            const back = L.DomUtil.create('button', 'btn fas fa-arrow-down');
            back.setAttribute('type', 'button');
            back.addEventListener('click', (e) => elements.bringToBack());
            inputsContainerRight.append(back);
        }

        return div
    },

    defineLayerElements(layer){
        let elements = {
            opacity: undefined,
            color:undefined,
            bringToFront: undefined,
            bringToBack: undefined ,
            legend:undefined,
            zoom: undefined
        }

        if(layer instanceof L.Marker){
            elements.opacity = {
                value: 1,
                func: (value) => layer.setOpacity(value)
            };
            elements.zoom = () => this._map.setView(layer.getLatLng(), this._map.getMaxZoom());
        }
        else if(layer instanceof L.Polygon){
            elements.opacity = {
                value: 0.2,
                func: (value) => layer.setStyle({fillOpacity:value})
            };
            elements.color = {
                value: () => {return layer.options.color || '#3388ff'},
                func: (value) => layer.setStyle({fillColor:value, color:value})
            };
            elements.legend = true;
            elements.bringToFront = () => layer.bringToFront();
            elements.bringToBack = () => layer.bringToBack();
            elements.zoom = () => this._map.fitBounds(layer.getBounds());
        }
        else if(layer instanceof L.GeoJSON){
            elements.opacity = {
                value: 0.2,
                func: (value) => layer.setStyle({fillOpacity:value, opacity: value})
            };
            elements.color = {
                value: () => {return layer.options.color || '#3388ff'},
                func: (value) => layer.setStyle({fillColor:value, color:value})
            };
            elements.legend = true;
            elements.bringToFront = () => layer.bringToFront();
            elements.bringToBack = () => layer.bringToBack();
            elements.zoom = () => this._map.fitBounds(layer.getBounds());
        }

        return elements
    },

    createLegend(arr){

        const container = L.DomUtil.create('div', 'ml-2');
        arr.forEach((elem) => {
            const div = document.createElement('div');

            const square = document.createElement('div');
            square.style.float = 'left';
            square.style.margin = '0.1rem';
            square.style.width = '10px';
            square.style.height = '10px';
            square.style.backgroundColor = elem.color;
            div.append(square);
    
            const txt = document.createElement('div');
            txt.innerText = elem.elemName;
            txt.style.fontSize = '10px';
            div.append(txt);

            container.append(div);
        });

        return container;
    },

    addOverlay(layer){

        if(!this.overlays) {
            this.overlays = [];
            this.toggle();
        }

        this.overlays.push(layer);

        const body = document.querySelector('.leaflet-controllable-legend-body');
        const overlaysContainer = body.firstChild;
        const index = overlaysContainer?.childNodes?.length || 0;
        const div = this.createChild(layer, index)
        
        overlaysContainer.append(div);
    },

    toggle(){
        this._container.childNodes.forEach(child => child.classList.toggle('hidden'));
    },

    evalLength(){
        if(this.overlays.length === 0) this.toggle();
    },

    findIndexByName(name){
        return this.overlays.findIndex(overlay => overlay.name === name)
    },

    validateNames(){
        const names = (this.overlays.map(overlay => overlay.name)).sort();
        names.reduce((pv, cv) => {
            if(pv !== cv ) return cv
            else throw new Error(`Overlays names must be unique. Repeated name: '${cv}'`)
        })
    }
})

L.multiControl = function(overlays, options){
    return new L.Control.multiControl(overlays, options);  
}
