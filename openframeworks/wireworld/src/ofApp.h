#pragma once

#include "ofMain.h"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void mouseEntered(int x, int y);
		void mouseExited(int x, int y);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
        int countNeighborhs(int x, int y, ofColor c);
		
        ofPixels img;
        ofPixels buff;
        ofColor colors[4] = {
            ofColor::fromHex(0x000000), // 0
            ofColor::fromHex(0xfec549), // 1
            ofColor::fromHex(0x1899c9), // 2
            ofColor::fromHex(0xf38f91)  // 3
        };
        float scale = 5;
};
