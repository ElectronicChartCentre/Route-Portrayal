<?xml version="1.0" encoding="UTF-8"?>
<!-- Based on schema version 20190924 (document number 1944) -->
<S421:Dataset gml:id="S421.TST.GFULL.00001" 
xsi:schemaLocation="http://www.iho.int/S421/gml/cs0/1.0 ../schemas/S421/FMT/1.0.0/20210319/S421.xsd" 
xmlns:S421="http://www.iho.int/S421/gml/cs0/1.0" 
xmlns:xlink="http://www.w3.org/1999/xlink" 
xmlns:S100_profile="http://www.iho.int/S-100/profile/s100_gmlProfile" 
xmlns:S100="http://www.iho.int/s100gml/1.0" 
xmlns:gml="http://www.opengis.net/gml/3.2" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

	<gml:boundedBy>
		<gml:Envelope srsName="EPSG:4326">
			<gml:lowerCorner>-6.0000 40.0000</gml:lowerCorner>
			<gml:upperCorner>45.0000 65.0000</gml:upperCorner>
		</gml:Envelope>
	</gml:boundedBy>
	
	<member>
		<S421:Route gml:id="RTE">
			<routeFormatVersion>1.0</routeFormatVersion>
			<routeID>GFULL-0001</routeID> 
			<routeEditionNo>1</routeEditionNo>
			<routeInfo xlink:href="#RTE.INFO" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeInfo" />
			<routeWaypoints xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypoints"/>
			<routeSchedules xlink:href="#RTE.SCHEDS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeSchedules"/>
			<routeActionPoints xlink:href="#RTE.APTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeActionPoints"/>
			<routeExtensions gml:id="RTE.EXT.1" routeExtensionsManufacturerId="ACME" routeExtensionsName="marpol_objects" routeExtensionsVersion="1">
					<routeExtensionsNote>object id="17" name="Oil for an oil tanker" info="Arears in which the adoption of special meandatory methods for the prevention of sea pollution by oil waters is required"</routeExtensionsNote>		
					<routeExtensionsNote>object id="5" name=" " info="Areas" </routeExtensionsNote>			
			</routeExtensions>
		</S421:Route>
	</member>
	
	<imember>
		<S421:RouteInfo gml:id="RTE.INFO">
			<routeInfoName>Maximum Implementation</routeInfoName>
			<routeInfoAuthor>Mikael</routeInfoAuthor>
			<routeInfoEditionTime>2019-10-18T12:49:00Z</routeInfoEditionTime>
			<routeInfoDescription>Testdata with all values provided</routeInfoDescription>
			<routeInfoStatus>10</routeInfoStatus>
			<routeInfoValidityStart>2019-10-18T12:49:00Z</routeInfoValidityStart>
			<routeInfoValidityEnd>2020-10-18T12:49:00Z</routeInfoValidityEnd>
			<routeInfoDeparturePortID1>Sesto</routeInfoDeparturePortID1>
			<routeInfoDeparturePortID2>Svartklubben</routeInfoDeparturePortID2>
			<routeInfoDeparturePortCall>urn:mrn:portcallid:sesto:b48bfbd0-cdcd-4f96-8dc9-f4371181fe7b</routeInfoDeparturePortCall>
			<routeInfoArrivalPortID1>Nobgo</routeInfoArrivalPortID1>
			<routeInfoArrivalPortID2>NOBGO-0020</routeInfoArrivalPortID2>
			<routeInfoArrivalPortCall>urn:mrn:portcallid:nobgo:9c6afe33-b235-4cbc-ad34-1d4e25f3afd4</routeInfoArrivalPortCall>
			<routeInfoReferencePrevRoute>route.id.1</routeInfoReferencePrevRoute>
			<routeInfoReferenceNextRoute>route.id.3</routeInfoReferenceNextRoute>
			<routeInfoVesselType>77</routeInfoVesselType>
			<routeInfoVesselName>BALTIC BRIGHT</routeInfoVesselName>
			<routeInfoVesselMMSI>265425000</routeInfoVesselMMSI>
			<routeInfoVesselCallsign>SIHZ</routeInfoVesselCallsign>
			<routeInfoVesselIMO>9129263</routeInfoVesselIMO>
			<routeInfoVesselVoyage>urn.mrn.stm.voyage.id.operator.44-18_cd032bed-c689-4915-803e-2f82d759accf</routeInfoVesselVoyage>
			<routeInfoVesselHeight>25.0</routeInfoVesselHeight>
			<routeInfoVesselLength>134.4</routeInfoVesselLength>
			<routeInfoVesselBeam>20.0</routeInfoVesselBeam>
			<routeInfoDraftMax>1000.0</routeInfoDraftMax>
			<routeInfoAirDraftMax>1000.0</routeInfoAirDraftMax>
			<routeInfoBeamMax>1000.0</routeInfoBeamMax>
			<routeInfoLengthMax>5000.0</routeInfoLengthMax>
			<routeInfoExtensions gml:id="RTE.INFO.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>position 10.40 20.20</routeExtensionsNote> 
			</routeInfoExtensions>
		</S421:RouteInfo>
	</imember>
	
	<member>
		<S421:RouteWaypoints gml:id="RTE.WPTS">	
		<routeWaypointsCollection xlink:href="RTE" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointsCollection"/>		
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.2" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.3" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.4" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.5" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.6" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.7" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.8" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.9" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypoint xlink:href="#RTE.WPTS.WPT.10" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/consistsOfRouteWaypoint"/>
			<routeWaypointsExtensions gml:id="RTE.WPTS.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>position 10.40 20.20</routeExtensionsNote>
			</routeWaypointsExtensions>
		</S421:RouteWaypoints>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.1" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.1.PT" srsName="EPSG:4326">
						<gml:pos>59.892863 25.822235</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>1</routeWaypointID>
			<routeWaypointName>WP Name 1</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.10</routeWaypointExternalReferenceID>
			<routeWaypointFixed>1</routeWaypointFixed>
			<routeWaypointTurnRadius>0.7</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointExtensions gml:id="RTE.WPT.1.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> refName "Sommer Night House" </routeExtensionsNote>
				<routeExtensionsNote> position lat="59.94708" lon="27.09999" </routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.2" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.2.PT" srsName="EPSG:4326">
						<gml:pos>59.483136 22.609812</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>2</routeWaypointID>
			<routeWaypointName>WP Name 2</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.17</routeWaypointExternalReferenceID>
			<routeWaypointFixed>0</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.2.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.3" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.3.PT" srsName="EPSG:4326">
						<gml:pos>59.142538 21.690909</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>3</routeWaypointID>
			<routeWaypointName>WP Name 3</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.1</routeWaypointExternalReferenceID>
			<routeWaypointFixed>true</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.2" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.3.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.4" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.4.PT" srsName="EPSG:4326">
						<gml:pos>58.059303 20.333722</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>4</routeWaypointID>
			<routeWaypointName>WP Name 4</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.3</routeWaypointExternalReferenceID>
			<routeWaypointFixed>false</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.3" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.4.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.5" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.5.PT" srsName="EPSG:4326">
						<gml:pos>56.346594 18.744942</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>5</routeWaypointID>
			<routeWaypointName>WP Name 5</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.4</routeWaypointExternalReferenceID>
			<routeWaypointFixed>1</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.4" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.5.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>

			
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.6" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.6.PT" srsName="EPSG:4326">
						<gml:pos>55.933128 17.609388</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>6</routeWaypointID>
			<routeWaypointName>WP Name 6</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.17</routeWaypointExternalReferenceID>
			<routeWaypointFixed>0</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.5" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.6.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPTS.WPT.7" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.7.PT" srsName="EPSG:4326">
						<gml:pos>55.599708 15.228708</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>7</routeWaypointID>
			<routeWaypointName>WP Name 7</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.8</routeWaypointExternalReferenceID>
			<routeWaypointFixed>1</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.6" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.7.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.8" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.8.PT" srsName="EPSG:4326">
						<gml:pos>55.396588 14.538908</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>8</routeWaypointID>
			<routeWaypointName>WP Name 8</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.11</routeWaypointExternalReferenceID>
			<routeWaypointFixed>0</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.7" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.8.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.9" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.9.PT" srsName="EPSG:4326">
						<gml:pos>55.051442 14.030897</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>9</routeWaypointID>
			<routeWaypointName>WP Name 9</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.12</routeWaypointExternalReferenceID>
			<routeWaypointFixed>1</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.8" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.9.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypoint gml:id="RTE.WPT.10" >
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.WPT.10.PT" srsName="EPSG:4326">
						<gml:pos>54.752189 12.686162</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeWaypointID>10</routeWaypointID>
			<routeWaypointName>WP Name 10</routeWaypointName>
			<routeWaypointExternalReferenceID>GSN1.123456</routeWaypointExternalReferenceID>
			<routeWaypointFixed>0</routeWaypointFixed>
			<routeWaypointTurnRadius>1.0</routeWaypointTurnRadius>
			<routeWaypointCollection xlink:href="#RTE.WPTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointCollection"/>
			<routeWaypointLeg xlink:href="#RTE.WPT.LEG.9" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLeg"/>
			<routeWaypointExtensions gml:id="RTE.WPT.10.EXT.1" routeExtensionsManufacturerId="AAA">
				<routeExtensionsNote> Be careful</routeExtensionsNote>
			</routeWaypointExtensions>
		</S421:RouteWaypoint>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.1" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.1.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>59.892863 25.822235 59.483136 22.609812</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>500</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>500</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>750</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>750</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>1</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>5.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegNote>Safety checked</routeWaypointLegNote>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.2" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.1.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.2" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.2.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>59.483136 22.609812 59.142538 21.690909</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>1000</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>1000</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>1250</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>1250</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>2</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>5.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegNote>Safety checked</routeWaypointLegNote>
			<routeWaypointLegIssue>Shallow water</routeWaypointLegIssue>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.3" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.2.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.3" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.3.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>59.142538 21.690909 58.059303 20.333722</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>1000</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>1000</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>1250</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>1250</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>1</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>0.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegNote>Safety checked</routeWaypointLegNote>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.4" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.3.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.4" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.4.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>58.059303 20.333722 56.346594 18.744942</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>1000</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>1000</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>1250</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>1250</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>2</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>0.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegNote>Safety checked</routeWaypointLegNote>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.5" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.4.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.5" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.5.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>56.346594 18.744942 55.933128 17.609388</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>1000</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>1000</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>1250</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>1250</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>1</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>0.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegNote>Safety checked</routeWaypointLegNote>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.6" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.5.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.6" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.6.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>55.933128 17.609388 55.599708 15.228708</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>1000</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>1000</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>1250</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>1250</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>2</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>0.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegNote>Safety checked</routeWaypointLegNote>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.7" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.6.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.7" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.7.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>55.599708 15.228708 55.396588 14.538908</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>1000</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>1000</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>1250</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>1250</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>1</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>0.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegNote>Safety checked</routeWaypointLegNote>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.8" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.7.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.8" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.8.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>55.396588 14.538908 55.051442 14.030897</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>750</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>750</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>1000</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>1000</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>2</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>5.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegNote>Safety checked</routeWaypointLegNote>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.9" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.8.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<member>
		<S421:RouteWaypointLeg gml:id="RTE.WPT.LEG.9" >
					<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.WPT.LEG.9.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:posList>55.051442 14.030897 54.752189 12.686162</gml:posList>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeWaypointLegStarboardXTDL>750</routeWaypointLegStarboardXTDL>
			<routeWaypointLegPortXTDL>750</routeWaypointLegPortXTDL>
			<routeWaypointLegStarboardCL>1000</routeWaypointLegStarboardCL>
			<routeWaypointLegPortCL>1000</routeWaypointLegPortCL>
			<routeWaypointLegSafetyContour>11.0</routeWaypointLegSafetyContour>
			<routeWaypointLegSafetyDepth>14.0</routeWaypointLegSafetyDepth>
			<routeWaypointLegGeometryType>1</routeWaypointLegGeometryType>
			<routeWaypointLegSOGMin>5.0</routeWaypointLegSOGMin>
			<routeWaypointLegSOGMax>30.0</routeWaypointLegSOGMax>
			<routeWaypointLegSTWMin>10.0</routeWaypointLegSTWMin>
			<routeWaypointLegSTWMax>30.0</routeWaypointLegSTWMax>
			<routeWaypointLegDraft>6.0</routeWaypointLegDraft>
			<routeWaypointLegDraftForward>5.8</routeWaypointLegDraftForward>
			<routeWaypointLegDraftAft>6.0</routeWaypointLegDraftAft>
			<routeWaypointLegDraftMax>1000.0</routeWaypointLegDraftMax>
			<routeWaypointLegAirDraftMax>1000.0</routeWaypointLegAirDraftMax>
			<routeWaypointLegBeamMax>1000.0</routeWaypointLegBeamMax>
			<routeWaypointLegLengthMax>5000.0</routeWaypointLegLengthMax>
			<routeWaypointLegStaticUKC>1.0</routeWaypointLegStaticUKC>
			<routeWaypointLegDynamicUKC>1.5</routeWaypointLegDynamicUKC>
			<routeWaypointLegSafetyMargin>3.0</routeWaypointLegSafetyMargin>
			<routeWaypointLegIssue>Check Safety </routeWaypointLegIssue>
			<routeWaypointLegCollection xlink:href="#RTE.WPT.10" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeWaypointLegCollection"/>
			<routeWaypointLegExtensions gml:id="RTE.WPT.LEG.9.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>Be carefule</routeExtensionsNote>
			</routeWaypointLegExtensions>
		</S421:RouteWaypointLeg>
	</member>
	
	<imember>
		<S421:RouteSchedules gml:id="RTE.SCHEDS">
			<routeSchedule xlink:href="#RTE.SCHED.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeSchedule"/>
			<routeSchedulesExtensions gml:id="RTE.SCHEDS.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check schedule</routeExtensionsNote>
			</routeSchedulesExtensions>
		</S421:RouteSchedules>
	</imember>
	
	<imember>
		<S421:RouteSchedule gml:id="RTE.SCHED.1">			
			<routeScheduleID>1</routeScheduleID>
			<routeScheduleName>Excel</routeScheduleName>
			<routeScheduleCollection xlink:href="#RTE.SCHEDS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleCollection"/>
			<routeScheduleManual xlink:href="#RTE.SCHED.1.MAN" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleManual"/>
			<routeScheduleCalculated xlink:href="#RTE.SCHED.1.CAL" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleCalculated"/>
			<routeScheduleRecommended xlink:href="#RTE.SCHED.1.REC" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleRecommended"/>
			<routeScheduleExtensions gml:id="RTE.SCHED.1.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check schedule</routeExtensionsNote>
			</routeScheduleExtensions> 
		</S421:RouteSchedule>
	</imember>
	
	<imember>
		<S421:RouteScheduleManual gml:id="RTE.SCHED.1.MAN">
			<routeScheduleCollection xlink:href="#RTE.SCHED.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleCollection"/>
			<routeScheduleElement xlink:href="#RTE.SCHED.1.MAN.ELEMENT.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleElement"/>
			<routeScheduleManualExtensions gml:id="RTE.SCHED.1.MAN.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check schedule </routeExtensionsNote>
			</routeScheduleManualExtensions>
		</S421:RouteScheduleManual>
	</imember>
	
	<imember>
		<S421:RouteScheduleElement gml:id="RTE.SCHED.1.MAN.ELEMENT.1">
			<routeWaypointId>1</routeWaypointId>
			<routeScheduleElementPlanSOG>20.0</routeScheduleElementPlanSOG>
			<routeScheduleElementETD>2019-10-18T15:00:00Z</routeScheduleElementETD>
			<routeScheduleElementETA>2019-10-21T10:30:00</routeScheduleElementETA>
			<routeScheduleElementETDWindowBefore>30</routeScheduleElementETDWindowBefore>
			<routeScheduleElementETDWindowAfter>30</routeScheduleElementETDWindowAfter>
			<routeScheduleElementETAWindowBefore>60</routeScheduleElementETAWindowBefore>
			<routeScheduleElementETAWindowAfter>60</routeScheduleElementETAWindowAfter>
			<routeScheduleElementNote>Set by operator</routeScheduleElementNote>
			<routeScheduleElementManualCollection xlink:href="#RTE.SCHED.1.MAN" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleElementManualCollection"/>
			<routeScheduleElementExtensions gml:id="RTE.SCHED.1.MAN.ELEMENT.1.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check schedule</routeExtensionsNote>
			</routeScheduleElementExtensions>
		</S421:RouteScheduleElement>
	</imember>
	
	<imember>
		<S421:RouteScheduleCalculated gml:id="RTE.SCHED.1.CAL">
			<routeScheduleCollection xlink:href="#RTE.SCHED.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleCollection"/>
			<routeScheduleElement xlink:href="#RTE.SCHED.1.CAL.ELEMENT.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleElement"/>
			<routeScheduleCalculatedExtensions gml:id="RTE.SCHED.1.CAL.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check schedule</routeExtensionsNote>
			</routeScheduleCalculatedExtensions>

		</S421:RouteScheduleCalculated>
	</imember>
	
	<imember>
		<S421:RouteScheduleElement gml:id="RTE.SCHED.1.CAL.ELEMENT.1">
			<routeWaypointId>1</routeWaypointId>
			<routeScheduleElementPlanSOG>20.0</routeScheduleElementPlanSOG>
			<routeScheduleElementETD>2019-10-18T15:00:00Z</routeScheduleElementETD>
			<routeScheduleElementETA>2019-10-21T10:30:00</routeScheduleElementETA>
			<routeScheduleElementETDWindowBefore>30</routeScheduleElementETDWindowBefore>
			<routeScheduleElementETDWindowAfter>30</routeScheduleElementETDWindowAfter>
			<routeScheduleElementETAWindowBefore>60</routeScheduleElementETAWindowBefore>
			<routeScheduleElementETAWindowAfter>60</routeScheduleElementETAWindowAfter>
			<routeScheduleElementNote>time check</routeScheduleElementNote>
			<routeScheduleElementCalculatedCollection xlink:href="#RTE.SCHED.1.CAL" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleElementCalculatedCollection"/>
			<routeScheduleElementExtensions gml:id="RTE.SCHED.1.CAL.ELEMENT.1.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check schedule</routeExtensionsNote>
			</routeScheduleElementExtensions>
		</S421:RouteScheduleElement>
	</imember>
	
	<imember>
		<S421:RouteScheduleRecommended gml:id="RTE.SCHED.1.REC">
			<routeScheduleCollection xlink:href="#RTE.SCHED.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeSchedule"/>
			<routeScheduleElement xlink:href="#RTE.SCHED.1.REC.ELEMENT.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleCollection"/>
		    <routeScheduleRecommendedExtensions gml:id="RTE.SCHED.1.REC.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check schedule</routeExtensionsNote>
		    </routeScheduleRecommendedExtensions>
		</S421:RouteScheduleRecommended>
	</imember>
	
	<imember>
		<S421:RouteScheduleElement gml:id="RTE.SCHED.1.REC.ELEMENT.1">
			<routeWaypointId>10</routeWaypointId>
			<routeScheduleElementPlanSOG>21.0</routeScheduleElementPlanSOG>
			<routeScheduleElementETD>2019-10-20T04:15:00Z</routeScheduleElementETD>
			<routeScheduleElementETA>2019-10-21T10:30:00</routeScheduleElementETA>
			<routeScheduleElementETDWindowBefore>60</routeScheduleElementETDWindowBefore>
			<routeScheduleElementETDWindowAfter>60</routeScheduleElementETDWindowAfter>
			<routeScheduleElementETAWindowBefore>60</routeScheduleElementETAWindowBefore>
			<routeScheduleElementETAWindowAfter>60</routeScheduleElementETAWindowAfter>
			<routeScheduleElementNote>Recommended from Port</routeScheduleElementNote>
			<routeScheduleElementRecommendedCollection xlink:href="#RTE.SCHED.1.REC" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeScheduleElementRecommendedCollection"/>
			<routeScheduleElementExtensions gml:id="RTE.SCHED.1.REC.ELEMENT.1.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check schedule element</routeExtensionsNote>
			</routeScheduleElementExtensions>
		</S421:RouteScheduleElement>
	</imember>
	
	<member>
		<S421:RouteActionPoints gml:id="RTE.APTS">
			<routeActionPointsCollection xlink:href="#RTE" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeActionPointsCollection"/>
			<routeActionPoint xlink:href="#RTE.APT.1" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeActionPoint"/>
			<!--
			<routeActionPoint xlink:href="#RTE.APTS.APT.2" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeActionPoint"/>
			<routeActionPoint xlink:href="#RTE.APTS.APT.3" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeActionPoint"/>
-->
			<routeActionPointsExtensions gml:id="RTE.APTS.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check actionpoint</routeExtensionsNote>
			</routeActionPointsExtensions>
		</S421:RouteActionPoints>
	</member>
	
	<member>
		<S421:RouteActionPoint gml:id="RTE.APT.1">	
			<geometry>
				<S100:pointProperty>
					<S100:Point gml:id="RTE.APT.1.PT" srsName="EPSG:4326">
						<gml:pos>58.881067 21.255957</gml:pos>
					</S100:Point>
				</S100:pointProperty>
			</geometry>
			<routeActionPointID>1</routeActionPointID>
			<routeActionPointName>Radio</routeActionPointName>
			<routeActionPointRadius>1.0</routeActionPointRadius>
			<routeActionPointTimeToAct>8.1</routeActionPointTimeToAct>
			<routeActionPointRequiredAction>1</routeActionPointRequiredAction>
			<routeActionPointRequiredActionDescription>Change radio channel</routeActionPointRequiredActionDescription>
			<routeActionPointCollection xlink:href="#RTE.APTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeActionPointCollection"/>
			<routeActionPointExtensions gml:id="RTE.APT.1.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check actionpoint</routeExtensionsNote>
			</routeActionPointExtensions>
		</S421:RouteActionPoint>
	</member>
	
	
	<member>
		<S421:RouteActionPoint gml:id="RTE.APT.2">
			<geometry>
				<S100:curveProperty>
					<S100:Curve gml:id="RTE.APT.2.CV">
						<gml:segments>
							<gml:LineStringSegment>
								<gml:pos>58.881067 21.255957</gml:pos>
								<gml:pos>60.881067 21.255957</gml:pos>
							</gml:LineStringSegment>
						</gml:segments>
					</S100:Curve>
				</S100:curveProperty>
			</geometry>
			<routeActionPointID>2</routeActionPointID>
			<routeActionPointName>VTS</routeActionPointName>
			<routeActionPointRadius>1.0</routeActionPointRadius>
			<routeActionPointTimeToAct>12</routeActionPointTimeToAct>

			<routeActionPointRequiredAction>2</routeActionPointRequiredAction>
			<routeActionPointRequiredActionDescription>Report to VTS</routeActionPointRequiredActionDescription>
			<routeActionPointCollection xlink:href="#RTE.APTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeActionPointCollection"/>
			<routeActionPointExtensions gml:id="RTE.APT.2.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check actionpoint</routeExtensionsNote>
			</routeActionPointExtensions>
		</S421:RouteActionPoint>
	</member>
	
	<member>
		<S421:RouteActionPoint gml:id="RTE.APT.3">
			<geometry>
				<S100:surfaceProperty>
					<gml:Surface gml:id="RTE.APT.3.SF">
						<gml:patches>
							<gml:PolygonPatch>
								<gml:exterior>
									<gml:LinearRing>
										<gml:posList>58.881067 21.255957 58.897893 21.583151 58.774577 21.522631 58.813773 21.231377 58.881067 21.255957</gml:posList>
									</gml:LinearRing>
								</gml:exterior>
							</gml:PolygonPatch>
						</gml:patches>
					</gml:Surface>
				</S100:surfaceProperty>
			</geometry>
			<routeActionPointID>3</routeActionPointID>
			<routeActionPointName>UKCM</routeActionPointName>
			<routeActionPointRadius>1.0</routeActionPointRadius>
			<routeActionPointTimeToAct>16</routeActionPointTimeToAct>
			<routeActionPointRequiredAction>3</routeActionPointRequiredAction>
			<routeActionPointRequiredActionDescription>Report to UKCM</routeActionPointRequiredActionDescription>
			<routeActionPointCollection xlink:href="#RTE.APTS" xlink:arcrole="http://www.iho.int/S-421/gml/1.0/roles/routeActionPointCollection"/>
			<routeActionPointExtensions gml:id="RTE.APT.3.EXT.1" routeExtensionsManufacturerId="AAA" routeExtensionsName="Test" routeExtensionsVersion="1">
				<routeExtensionsNote>check actionpoint</routeExtensionsNote>
			</routeActionPointExtensions>
		</S421:RouteActionPoint>
	</member>

</S421:Dataset>