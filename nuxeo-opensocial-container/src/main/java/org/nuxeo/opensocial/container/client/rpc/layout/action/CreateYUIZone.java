/*
 * (C) Copyright 2011 Nuxeo SA (http://nuxeo.com/) and contributors.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * Contributors:
 *     Stéphane Fourrier
 */

package org.nuxeo.opensocial.container.client.rpc.layout.action;

import org.nuxeo.opensocial.container.client.rpc.AbstractAction;
import org.nuxeo.opensocial.container.client.rpc.ContainerContext;
import org.nuxeo.opensocial.container.client.rpc.layout.result.CreateYUIZoneResult;
import org.nuxeo.opensocial.container.shared.layout.api.YUIComponentZone;

/**
 * @author Stéphane Fourrier
 */
public class CreateYUIZone extends AbstractAction<CreateYUIZoneResult> {

    private static final long serialVersionUID = 1L;

    private YUIComponentZone zone;

    private int zoneIndex;

    @SuppressWarnings("unused")
    private CreateYUIZone() {
        super();
    }

    public CreateYUIZone(ContainerContext containerContext, final YUIComponentZone zone, final int zoneIndex) {
        super(containerContext);
        this.zone = zone;
        this.zoneIndex = zoneIndex;
    }

    public YUIComponentZone getZone() {
        return zone;
    }

    public int getZoneIndex() {
        return zoneIndex;
    }

}
